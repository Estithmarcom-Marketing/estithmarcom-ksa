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
  createServiceShape2Schema,
  ServiceShape2Values,
} from "@/lib/schemas/service-shape-2.schema";
import { AxiosError } from "axios";
import CustomLoader from "../global/custom-loader";
import RichTextViewer from "../global/rich-text-viewer";
import ServiceOrderCard from "./service-order-card";

export default function ServiceShape2({ service }: { service: ServiceType }) {
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

  const formik = useFormik<ServiceShape2Values>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country_id: 0,
      company: "",
      notes: "",
      service_id: service.id,
    },
    validationSchema: toFormikValidationSchema(createServiceShape2Schema()),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service_id: values.service_id,
        country_id: values.country_id,
        additional_info: {
          company_name: values.company,
          notes: values.notes,
        },
      };
      mutate(payload);
    },
  });

  return (
    <div className="py-10 grid grid-cols-1 gap-y-10 gap-x-20 items-start lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">{service.title}</h1>
        <div className="mt-5">
          <RichTextViewer content={service.long_description} />
        </div>
      </div>

      <ServiceOrderCard service={service} />
    </div>
  );
}
