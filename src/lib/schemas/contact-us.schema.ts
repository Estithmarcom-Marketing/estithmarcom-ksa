import z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const createContactUsSchema = () =>
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
    notes: z.preprocess((val) => val ?? "", z.string()),
  });

export type ContactUsValues = z.infer<
  ReturnType<typeof createContactUsSchema>
>;
