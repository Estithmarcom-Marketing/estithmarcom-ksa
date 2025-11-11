import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "ما الذي يجعل حاضنة أعمال استثماركوم مع غيرها من الشركات؟",
      answer: "نحن نقدم خدمات متكاملة تشمل الاستشارات القانونية، التمويل، والدعم الفني لضمان نجاح مشروعك."
    },
    {
      question: "كم الفترة التي سنستغرقها حاضنة أعمال استثماركوم لإنهاء الخدمة؟",
      answer: "تختلف المدة حسب نوع الخدمة، لكننا نلتزم بتقديم خدمات سريعة وفعالة مع الحفاظ على أعلى معايير الجودة."
    },
    {
      question: "هل يتم توفير التمويل للمشاريع الحكومية لإنهاء الخدمة؟",
      answer: "نعم، نساعد في ربط المشاريع مع الجهات التمويلية المناسبة وتقديم الدعم اللازم للحصول على التمويل."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-cairo font-bold text-primary text-center mb-12">
          الأسئلة الشائعة
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-right font-cairo font-semibold text-lg hover:text-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-right font-cairo text-foreground/80 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;