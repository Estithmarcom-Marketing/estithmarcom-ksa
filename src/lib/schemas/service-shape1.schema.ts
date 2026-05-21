import z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const createServiceShape1Schema = () =>
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
          if (!val || val.length <= 4) return true; // Don't validate just the dial code
          return isValidPhoneNumber(val);
        }, "form.validation2.phone"),
    ),
    country_id: z.preprocess(
      (val) => val ?? 0,
      z.number().min(1, "form.validation.country"),
    ),
    company: z.preprocess(
      (val) => val ?? "",
      z.string().min(1, "form.validation.company"),
    ),
    notes: z.preprocess((val) => val ?? "", z.string()),
    service_id: z.preprocess((val) => val ?? 0, z.number().min(1)),
    service_type: z.preprocess(
      (val) => val ?? "",
      z.string().min(1, "form.validation.service"),
    ),
  });

export type ServiceShape1Values = z.infer<
  ReturnType<typeof createServiceShape1Schema>
>;
