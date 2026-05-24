"use client";

import SpecialHeader from "@/components/global/special-header";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { FAQType } from "@/lib/types/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const faq: FAQType[] = [
    {
      id: 1,
      question: "ما الذي يميز حاضنة وأعمال استثماركوم عن غيرها من الشركات؟",
      answer:
        "تتميز حاضنة وأعمال استثماركوم بتقديم دعم متكامل للشركات الناشئة يشمل الإرشاد، والتمويل، وبناء الشبكات، بالإضافة إلى بيئة عمل محفزة تساعد على الابتكار والنمو. كما تعتمد على خبرات متنوعة وشراكات استراتيجية تساهم في تسريع نجاح المشاريع وتحقيق الاستدامة.",
    },
    {
      id: 2,
      question: "ما الذي يميز حاضنة وأعمال استثماركوم عن غيرها من الشركات؟",
      answer:
        "تتميز حاضنة وأعمال استثماركوم بتقديم دعم متكامل للشركات الناشئة يشمل الإرشاد، والتمويل، وبناء الشبكات، بالإضافة إلى بيئة عمل محفزة تساعد على الابتكار والنمو. كما تعتمد على خبرات متنوعة وشراكات استراتيجية تساهم في تسريع نجاح المشاريع وتحقيق الاستدامة.",
    },
    {
      id: 3,
      question: "ما الذي يميز حاضنة وأعمال استثماركوم عن غيرها من الشركات؟",
      answer:
        "تتميز حاضنة وأعمال استثماركوم بتقديم دعم متكامل للشركات الناشئة يشمل الإرشاد، والتمويل، وبناء الشبكات، بالإضافة إلى بيئة عمل محفزة تساعد على الابتكار والنمو. كما تعتمد على خبرات متنوعة وشراكات استراتيجية تساهم في تسريع نجاح المشاريع وتحقيق الاستدامة.",
    },
  ];

  return (
    <div className="container">
      <SpecialHeader header={t("faq.title")} />
      <div className="mt-15">
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((item) => (
            <AccordionItem key={item.id} value={`item-${item.id}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
