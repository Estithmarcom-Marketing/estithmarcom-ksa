import z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const createServiceShape4Schema = () =>
  z.object({
    name: z.preprocess(
      (val) => val ?? "",
      z.string().min(1, "form.validation.name"),
    ),
    email: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(1, "form.validation.email")
        .email("form.validation.email_invalid"),
    ),
    phone: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(1, "form.validation.phone")
        .refine((val) => {
          if (!val || val.length <= 4) return true;
          return isValidPhoneNumber(val);
        }, "form.validation2.phone"),
    ),
    country_id: z.preprocess(
      (val) => val ?? 0,
      z.number().min(1, "form.validation.country"),
    ),
    investor_type: z.preprocess(
      (val) => val ?? "",
      z.string().min(1, "form.validation.investorType"),
    ),
    investment_field: z.preprocess(
      (val) => val ?? "",
      z.string().min(1, "form.validation.investmentField"),
    ),
    connection_way: z.preprocess(
      (val) => val ?? "",
      z.string().min(1, "form.validation.connectionWay"),
    ),
    notes: z.preprocess((val) => val ?? "", z.string()),
    service_id: z.preprocess((val) => val ?? 0, z.number().min(1)),
  });

export type ServiceShape4Values = z.infer<
  ReturnType<typeof createServiceShape4Schema>
>;
