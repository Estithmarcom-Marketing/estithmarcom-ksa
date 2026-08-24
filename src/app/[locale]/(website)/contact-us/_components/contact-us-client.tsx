"use client";

import PagesHero from "@/components/global/pages-hero";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator, TranslationKey } from "@/lib/i18n";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  createContactUsSchema,
  ContactUsValues,
} from "@/lib/schemas/contact-us.schema";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/global/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsType } from "@/lib/types/settings";
import { CountryType } from "@/lib/types/country";
import { useMutation } from "@tanstack/react-query";
import useAxios from "@/hooks/use-axios";
import { sendServiceRequest } from "@/lib/apis/contact";
import { toast } from "sonner";
import { AxiosError } from "axios";
import CustomLoader from "@/components/global/custom-loader";
import banner from "@/assets/contact-banner.webp"

export default function ContactUsClient({
  settings,
  countries,
}: {
  settings: SettingsType;
  countries: CountryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const axiosInstance = useAxios();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ContactUsValues) =>
      sendServiceRequest(axiosInstance, values),
    onSuccess: () => {
      toast.success(t("contactus.success" as TranslationKey));
      formik.resetForm();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const formik = useFormik<ContactUsValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country_id: 0,
      message: "",
    },
    validationSchema: toFormikValidationSchema(createContactUsSchema()),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        country_id: values.country_id,
        message: values.message,
        phone: values.phone,
      };
      mutate(payload);
    },
  });

  return (
    <>
      <PagesHero title={t("contactus")} desc={t("contactUsPage.desc")} banner={banner} />
      <section className="py-[70px]! sm:py-[100px]! container">
        <p className="mb-8 leading-relaxed">{t("contactUsPage.desc")}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="bg-white rounded-2xl col-span-1 lg:col-span-2 p-8 border border-gray-100">
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <Label htmlFor="name">
                    {t("form.fullName" as TranslationKey)}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t(
                      "form.fullName.placeholder" as TranslationKey,
                    )}
                    {...formik.getFieldProps("name")}
                    aria-invalid={!!(formik.touched.name && formik.errors.name)}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-400 text-xs">
                      {t(formik.errors.name as any)}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">
                    {t("form.email" as TranslationKey)}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("form.email.placeholder" as TranslationKey)}
                    {...formik.getFieldProps("email")}
                    aria-invalid={
                      !!(formik.touched.email && formik.errors.email)
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-400 text-xs">
                      {t(formik.errors.email as any)}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      {countries.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.submitCount > 0 && formik.errors.country_id && (
                    <p className="text-red-400 text-xs">
                      {t(formik.errors.country_id as any)}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone">
                    {t("form.phone" as TranslationKey)}
                  </Label>
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
                    <p className="text-red-400 text-xs">
                      {t(formik.errors.phone as any)}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="message">
                  {t("form.message" as TranslationKey)}
                </Label>
                <Textarea
                  id="message"
                  className="resize-none h-32"
                  placeholder={t("form.message.placeholder" as TranslationKey)}
                  {...formik.getFieldProps("message")}
                  aria-invalid={
                    !!(formik.touched.message && formik.errors.message)
                  }
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-400 text-xs">
                    {t(formik.errors.message as any)}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-sm transition-all"
                >
                  {isPending ? <CustomLoader w={24} color="white" /> : t("form.submit2")}
                </Button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">
              {t("contactus")}
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p dir="ltr" className="text-gray-600">
                    +{settings.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  {settings.addresses.map((address) => (
                    <p key={address.id} className="text-gray-600">{address.address}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
