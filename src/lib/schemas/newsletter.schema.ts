import z from "zod";

export const createNewsletterSchema = () =>
  z.object({
    email: z.preprocess(
      (val) => val ?? "",
      z
        .string()
        .min(1, "form.validation.email")
        .email("form.validation.email_invalid"),
    ),
  });

export type NewsletterValues = z.infer<
  ReturnType<typeof createNewsletterSchema>
>;
