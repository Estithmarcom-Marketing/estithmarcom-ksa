"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator, TranslationKey } from "@/lib/i18n";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  createNewsletterSchema,
  NewsletterValues,
} from "@/lib/schemas/newsletter.schema";
import useAxios from "@/hooks/use-axios";
import { useMutation } from "@tanstack/react-query";
import { sendSubscribe } from "@/lib/apis/subscribe";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function Newsletter() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const axiosInstance = useAxios();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: NewsletterValues) =>
      sendSubscribe(axiosInstance, values),
    onSuccess: () => {
      toast.success(t("newsletter.success" as TranslationKey));
      formik.resetForm();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const formik = useFormik<NewsletterValues>({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(createNewsletterSchema()),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="bg-primary rounded-lg p-5 text-white">
      <p className="text-xl font-bold my-2">
        {t("blogpage.sidebar.newsletter.title")}
      </p>
      <p className="my-5 text-sm text-white/50">
        {t("blogpage.sidebar.newsletter.desc")}
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-1">
          <input
            type="email"
            id="email"
            placeholder={t("blogpage.sidebar.newsletter.email")}
            className="bg-transparent mt-5 text-xs border border-t-transparent border-l-transparent border-r-transparent border-b-white/20 py-2 outline-none w-full placeholder:text-white/50"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-[10px]">
              {t(formik.errors.email as any)}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-white mt-5 py-2 text-[#666] text-sm duration-300 hover:bg-secondary hover:text-white cursor-pointer font-bold w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? t("loading") : t("footer.newsletter.subscribe")}
        </button>
      </form>
    </div>
  );
}

