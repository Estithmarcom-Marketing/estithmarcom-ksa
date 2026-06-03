"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator, TranslationKey } from "@/lib/i18n";
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/global/phone-input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { createResidencyFormSchema, ResidencyFormValues } from "@/lib/schemas/residency-form.schema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ResidencyType } from "@/lib/types/residency";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { sendResidencyRequest } from "@/lib/apis/residencyClient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import CustomLoader from "@/components/global/custom-loader";

export default function ResidencyForm({ countries, residency }: { countries: any[]; residency: ResidencyType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const axiosInstance = useAxios();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ResidencyFormValues) =>
      sendResidencyRequest(axiosInstance, values),
    onSuccess: () => {
      toast.success(t("service.request.success" as TranslationKey));
      formik.resetForm();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message || t("service.request.error" as TranslationKey)
      );
    },
  });

  const formik = useFormik<ResidencyFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country_id: 0,
      city: "",
      notes: "",
      residency_id: residency.id,
    },
    validationSchema: toFormikValidationSchema(createResidencyFormSchema()),
    onSubmit: (values) => {
      mutate(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-1">
          <Label htmlFor="name">{t("form.fullName")}</Label>
          <Input
            id="name"
            placeholder={t("form.fullName.placeholder")}
            {...formik.getFieldProps("name")}
            aria-invalid={!!(formik.touched.name && formik.errors.name)}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-400 text-xs px-1">
              {t(formik.errors.name as any)}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">{t("form.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("form.email.placeholder")}
            {...formik.getFieldProps("email")}
            aria-invalid={!!(formik.touched.email && formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-xs px-1">
              {t(formik.errors.email as any)}
            </p>
          )}
        </div>

        {/* Country & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <Label htmlFor="country">
              {t("form.country")}
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
                  placeholder={t("form.country.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
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
            <Label htmlFor="phone">{t("form.phone")}</Label>
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

        {/* City */}
        <div className="space-y-1">
          <Label htmlFor="city">{t("form.city")}</Label>
          <Input
            id="city"
            placeholder={t("form.city.placeholder")}
            {...formik.getFieldProps("city")}
            aria-invalid={!!(formik.touched.city && formik.errors.city)}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-400 text-xs px-1">
              {t(formik.errors.city as any)}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <Label htmlFor="notes">{t("form.notes")}</Label>
          <Textarea
            className="resize-none h-32"
            id="notes"
            placeholder={t("form.notes.placeholder")}
            {...formik.getFieldProps("notes")}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-medium"
          >
            {isPending ? <CustomLoader w={24} color="white" /> : t("form.submit2")}
          </Button>
        </div>
      </div>
    </form>
  );
}
