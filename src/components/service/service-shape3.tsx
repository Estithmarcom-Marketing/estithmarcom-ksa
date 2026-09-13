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
  createServiceShape3Schema,
  ServiceShape3Values,
} from "@/lib/schemas/service-shape3.schema";
import {
  DESK_TYPES_BY_COUNTRY,
  CITIES_BY_COUNTRY,
} from "@/data/service-form-data";
import { AxiosError } from "axios";
import CustomLoader from "../global/custom-loader";
import RichTextViewer from "../global/rich-text-viewer";
import ServiceOrderCard from "./service-order-card";

export default function ServiceShape3({ service }: { service: ServiceType }) {
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

  const formik = useFormik<ServiceShape3Values>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country_id: 0,
      size: "",
      city: "",
      notes: "",
      service_id: service.id,
    },
    validationSchema: toFormikValidationSchema(createServiceShape3Schema()),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service_id: values.service_id,
        country_id: values.country_id,
        additional_info: {
          office_size: values.size,
          city: values.city,
          notes: values.notes,
        },
      };
      mutate(payload);
    },
  });

    const deskTypes = (DESK_TYPES_BY_COUNTRY[formik.values.country_id] ?? []).map(
    (d) => ({
      id: d.id,
      name: t(d.nameKey),
    }),
  );

const cities = (CITIES_BY_COUNTRY[formik.values.country_id] ?? []).map(
    (c) => ({
      id: c.id,
      name: t(c.nameKey),
    }),
  );

  return (
    <div className="py-10 grid grid-cols-1 gap-y-10 gap-x-20 lg:grid-cols-2">
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
