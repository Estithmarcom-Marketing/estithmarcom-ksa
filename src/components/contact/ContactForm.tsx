import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const ContactForm = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string()
      .trim()
      .min(1, { message: t('contactPage.validation.nameRequired') })
      .max(100, { message: t('contactPage.validation.nameMax') }),
    email: z.string()
      .trim()
      .min(1, { message: t('contactPage.validation.emailRequired') })
      .email({ message: t('contactPage.validation.emailInvalid') })
      .max(255),
    phone: z.string()
      .trim()
      .min(1, { message: t('contactPage.validation.phoneRequired') })
      .regex(/^[\d\s\+\-\(\)]+$/, { message: t('contactPage.validation.phoneInvalid') })
      .max(20),
    service: z.string()
      .min(1, { message: t('contactPage.validation.serviceRequired') }),
    message: z.string()
      .trim()
      .min(1, { message: t('contactPage.validation.messageRequired') })
      .max(1000, { message: t('contactPage.validation.messageMax') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      // Create WhatsApp message with proper encoding
      const message = `
${t('contactPage.form.name')}: ${values.name}
${t('contactPage.form.email')}: ${values.email}
${t('contactPage.form.phone')}: ${values.phone}
${t('contactPage.form.service')}: ${values.service}
${t('contactPage.form.message')}: ${values.message}
      `.trim();

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/966551639995?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: t('contactPage.success'),
        description: language === 'ar' ? 'سيتم فتح واتساب للمتابعة' : 'WhatsApp will open to continue',
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t('contactPage.error'),
        variant: "destructive",
      });
    }
  };

  const services = [
    { value: "company-formation", label: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation' },
    { value: "legal-services", label: language === 'ar' ? 'الخدمات القانونية' : 'Legal Services' },
    { value: "incubation", label: language === 'ar' ? 'احتضان المشاريع' : 'Project Incubation' },
    { value: "residency", label: language === 'ar' ? 'الإقامة المميزة' : 'Premium Residency' },
    { value: "workspace", label: language === 'ar' ? 'حجز مكتب' : 'Office Booking' },
    { value: "consulting", label: language === 'ar' ? 'استشارات' : 'Consulting' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-cairo ${isRTL ? 'text-right' : 'text-left'} block`}>
                    {t('contactPage.form.name')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('contactPage.form.namePlaceholder')}
                      className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-cairo ${isRTL ? 'text-right' : 'text-left'} block`}>
                    {t('contactPage.form.email')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('contactPage.form.emailPlaceholder')}
                      className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`} />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-cairo ${isRTL ? 'text-right' : 'text-left'} block`}>
                    {t('contactPage.form.phone')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={t('contactPage.form.phonePlaceholder')}
                      className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={`font-cairo ${isRTL ? 'text-right' : 'text-left'} block`}>
                    {t('contactPage.form.service')}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`}>
                        <SelectValue placeholder={t('contactPage.form.selectService')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value} className="font-cairo">
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`} />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`font-cairo ${isRTL ? 'text-right' : 'text-left'} block`}>
                  {t('contactPage.form.message')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('contactPage.form.messagePlaceholder')}
                    className={`font-cairo ${isRTL ? 'text-right' : 'text-left'} min-h-[150px]`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={`font-cairo ${isRTL ? 'text-right' : 'text-left'}`} />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-primary font-cairo font-bold text-lg py-6"
          >
            {t('contactPage.form.send')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
