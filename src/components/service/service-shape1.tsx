"use client";

import { ServiceType } from "@/lib/types/service";
import { Input } from "../ui/input";
import { PhoneInput } from "../global/phone-input";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator, TranslationKey } from "@/lib/i18n";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ServiceSelector } from "./service-selector";
import { Button } from "../ui/button";
import {
  createServiceShape1Schema,
  ServiceShape1Values,
} from "@/lib/schemas/service-shape1.schema";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ServiceTypeItem } from "@/data/services_type";
import useAxios from "@/hooks/use-axios";
import { useMutation } from "@tanstack/react-query";
import { sendServiceRequest } from "@/lib/apis/serivceClient";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ServiceShape1({ service }: { service: ServiceType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const axiosInstance = useAxios();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => sendServiceRequest(axiosInstance, values),
    onSuccess: () => {
      toast.success(t("service.request.success" as TranslationKey));
      formik.resetForm();
    },
    onError: () => {
      toast.error(t("service.request.error" as TranslationKey));
    },
  });

  const formik = useFormik<ServiceShape1Values>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country_id: 0,
      company: "",
      notes: "",
      service_type: "",
      service_id: service.id,
    },
    validationSchema: toFormikValidationSchema(createServiceShape1Schema()),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service_id: values.service_id,
        country_id: values.country_id,
        additional_info: {
          company_name: values.company,
          service_type: t(values.service_type as TranslationKey),
          notes: values.notes,
        },
      };
      mutate(payload);
    },
  });

  const handleServiceSelect = (item: ServiceTypeItem | null) => {
    formik.setFieldValue("service_type", item?.title ?? "", true);
  };

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold">{service.title}</h1>
      <p className="text-sm text-[#666] mt-5">{service.short_description}</p>

      <form
        id="serviceForm"
        onSubmit={formik.handleSubmit}
        noValidate
        className="pt-10 scroll-mt-20 flex flex-col lg:flex-row justify-between gap-10"
      >
        {/* ── Service selector panel ─────────────────────────────────────── */}
        <div className="flex-1/2 w-full bg-[#f8f8fc] rounded-lg overflow-hidden">
          <ServiceSelector onSelect={handleServiceSelect} />
          {formik.submitCount > 0 && formik.errors.service_type && (
            <p className="text-red-400 text-xs px-5 pb-4">
              {t(formik.errors.service_type as any)}
            </p>
          )}
        </div>

        {/* ── Fields panel ───────────────────────────────────────────────── */}
        <div className="bg-white flex-1/2 special-shadow rounded-xl px-6 py-10">
          {/* Row 1 — name + email */}
          <div className="grid mb-5 xl:grid-cols-2 gap-5">
            <div className="space-y-1">
              <Label htmlFor="name">
                {t("form.fullName" as TranslationKey)}
              </Label>
              <Input
                id="name"
                placeholder={t("form.fullName.placeholder" as TranslationKey)}
                {...formik.getFieldProps("name")}
                aria-invalid={!!(formik.touched.name && formik.errors.name)}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-400 text-xs px-1">
                  {t(formik.errors.name as any)}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">{t("form.email" as TranslationKey)}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("form.email.placeholder" as TranslationKey)}
                {...formik.getFieldProps("email")}
                aria-invalid={!!(formik.touched.email && formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-xs px-1">
                  {t(formik.errors.email as any)}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 — country + phone */}
          <div className="grid mb-5 xl:grid-cols-2 gap-5">
            <div className="space-y-1">
              <Label htmlFor="country">
                {t("form.country" as TranslationKey)}
              </Label>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={(val) => {
                  formik.setFieldValue("country_id", parseInt(val), true);
                }}
                value={
                  formik.values.country_id > 0
                    ? formik.values.country_id.toString()
                    : ""
                }
              >
                <SelectTrigger
                  id="country"
                  className="w-full"
                  aria-invalid={
                    !!(formik.submitCount > 0 && formik.errors.country_id)
                  }
                >
                  <SelectValue
                    placeholder={t(
                      "form.country.placeholder" as TranslationKey,
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {service.countries.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.submitCount > 0 && formik.errors.country_id && (
                <p className="text-red-400 text-xs px-1 mt-1">
                  {t(formik.errors.country_id as any)}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">{t("form.phone" as TranslationKey)}</Label>
              <PhoneInput
                value={formik.values.phone}
                defaultCountry="SA"
                placeholder={t("form.phone.placeholder")}
                searchPlaceholder={t("form.phone.search")}
                emptyText={t("form.phone.empty")}
                error={!!(formik.touched.phone && formik.errors.phone)}
                onChange={(e164) => {
                  formik.setFieldValue("phone", e164);
                }}
                onInputChange={() => {
                  // This can stay to clear other local states if needed, 
                  // but for validation, formik.setFieldValue handles it.
                }}
                onBlur={() => {
                  formik.setFieldTouched("phone", true);
                }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-400 text-xs px-1">
                  {t(formik.errors.phone as any)}
                </p>
              )}
            </div>
          </div>

          {/* Row 3 — company */}
          <div className="mb-5 space-y-1">
            <Label htmlFor="company">
              {t("form.companyName" as TranslationKey)}
            </Label>
            <Input
              id="company"
              placeholder={t("form.companyName.placeholder" as TranslationKey)}
              {...formik.getFieldProps("company")}
              aria-invalid={!!(formik.touched.company && formik.errors.company)}
            />
            {formik.touched.company && formik.errors.company && (
              <p className="text-red-400 text-xs px-1">
                {t(formik.errors.company as any)}
              </p>
            )}
          </div>

          {/* Row 4 — notes */}
          <div className="space-y-1">
            <Label htmlFor="notes">{t("form.notes" as TranslationKey)}</Label>
            <Textarea
              className="resize-none h-40"
              id="notes"
              placeholder={t("form.notes.placeholder" as TranslationKey)}
              {...formik.getFieldProps("notes")}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white text-sm px-10 font-medium disabled:opacity-60"
            >
              {isPending ? t("loading") : t("form.submit2")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
