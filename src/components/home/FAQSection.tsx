import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
  const faqs = [
    { questionKey: 'faq.q1', answerKey: 'faq.a1' },
    { questionKey: 'faq.q2', answerKey: 'faq.a2' },
    { questionKey: 'faq.q3', answerKey: 'faq.a3' }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary text-center mb-8 md:mb-12">
          {t('faq.title')}
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className={`${isRTL ? 'text-right' : 'text-left'} font-cairo font-semibold text-base md:text-lg hover:text-accent`}>
                {t(faq.questionKey)}
              </AccordionTrigger>
              <AccordionContent className={`${isRTL ? 'text-right' : 'text-left'} font-cairo text-foreground/80 leading-relaxed text-sm md:text-base`}>
                {t(faq.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
