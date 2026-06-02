"use client";

import { ServiceType } from "@/lib/types/service";
import { Input } from "../ui/input";
import { PhoneInput } from "../global/phone-input";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator, TranslationKey } from "@/lib/i18n";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
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
import {
  createServiceShape4Schema,
  ServiceShape4Values,
} from "@/lib/schemas/service-shape4.schema";
import {
  INVESTOR_TYPES,
  INVESTMENT_FIELDS,
  CONNECTION_WAYS,
} from "@/data/service-form-data";
import { AxiosError } from "axios";

export default function ServiceShape4({ service }: { service: ServiceType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const axiosInstance = useAxios();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => sendServiceRequest(axiosInstance, values),
    onSuccess: () => {
      toast.success(t("service.request.success" as TranslationKey));
      formik.resetForm();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const investorTypes = INVESTOR_TYPES.map((s) => ({
    id: s.id,
    name: t(s.nameKey),
  }));

  const investmentFields = INVESTMENT_FIELDS.map((s) => ({
    id: s.id,
    name: t(s.nameKey),
  }));

  const connectionWays = CONNECTION_WAYS.map((s) => ({
    id: s.id,
    name: t(s.nameKey),
  }));

  const formik = useFormik<ServiceShape4Values>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country_id: 0,
      investor_type: "",
      investment_field: "",
      connection_way: "",
      notes: "",
      service_id: service.id,
    },
    validationSchema: toFormikValidationSchema(createServiceShape4Schema()),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service_id: values.service_id,
        country_id: values.country_id,
        additional_info: {
          investor_type: values.investor_type,
          investment_field: values.investment_field,
          connection_way: values.connection_way,
          notes: values.notes,
        },
      };
      mutate(payload);
    },
  });

  return (
    <div className="py-10 grid grid-cols-1 gap-y-10 gap-x-20 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">{service.title}</h1>
        <p className="text-sm text-[#666] mt-5">{service.short_description}</p>
      </div>

      <form
        id="serviceForm"
        onSubmit={formik.handleSubmit}
        noValidate
        className="scroll-mt-30 flex flex-col lg:flex-row justify-between gap-10"
      >
        <div className="bg-white flex-1/2 special-shadow rounded-xl px-6 py-10">
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

          <div className="grid mb-5 xl:grid-cols-2 gap-5">
            <div className="space-y-1">
              <Label htmlFor="investor_type">
                {t("service.shape4.investorType" as TranslationKey)}
              </Label>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={(val) => {
                  formik.setFieldValue("investor_type", val, true);
                }}
                value={formik.values.investor_type}
              >
                <SelectTrigger
                  id="investor_type"
                  className="w-full"
                  aria-invalid={
                    !!(formik.submitCount > 0 && formik.errors.investor_type)
                  }
                >
                  <SelectValue
                    placeholder={t(
                      "service.shape4.investorType.placeholder" as TranslationKey,
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {investorTypes.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.submitCount > 0 && formik.errors.investor_type && (
                <p className="text-red-400 text-xs px-1">
                  {t(formik.errors.investor_type as any)}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="investment_field">
                {t("service.shape4.investmentField" as TranslationKey)}
              </Label>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={(val) => {
                  formik.setFieldValue("investment_field", val, true);
                }}
                value={formik.values.investment_field}
              >
                <SelectTrigger
                  id="investment_field"
                  className="w-full"
                  aria-invalid={
                    !!(formik.submitCount > 0 && formik.errors.investment_field)
                  }
                >
                  <SelectValue
                    placeholder={t(
                      "service.shape4.investmentField.placeholder" as TranslationKey,
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {investmentFields.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.submitCount > 0 && formik.errors.investment_field && (
                <p className="text-red-400 text-xs px-1">
                  {t(formik.errors.investment_field as any)}
                </p>
              )}
            </div>
          </div>

          <div className="mb-5 space-y-1">
            <Label htmlFor="connection_way">
              {t("service.shape4.connectionWay" as TranslationKey)}
            </Label>
            <Select
              dir={locale === "ar" ? "rtl" : "ltr"}
              onValueChange={(val) => {
                formik.setFieldValue("connection_way", val, true);
              }}
              value={formik.values.connection_way}
            >
              <SelectTrigger
                id="connection_way"
                className="w-full"
                aria-invalid={
                  !!(formik.submitCount > 0 && formik.errors.connection_way)
                }
              >
                <SelectValue
                  placeholder={t(
                    "service.shape4.connectionWay.placeholder" as TranslationKey,
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                {connectionWays.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.submitCount > 0 && formik.errors.connection_way && (
              <p className="text-red-400 text-xs px-1">
                {t(formik.errors.connection_way as any)}
              </p>
            )}
          </div>

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
