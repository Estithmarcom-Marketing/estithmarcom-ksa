import { useLanguage } from "@/contexts/LanguageContext";

const ProcessSteps = () => {
  const { t } = useLanguage();
  
  const steps = [
    { number: 1, key: 'process.step1' },
    { number: 2, key: 'process.step2' },
    { number: 3, key: 'process.step3' },
    { number: 4, key: 'process.step4' },
    { number: 5, key: 'process.step5' },
    { number: 6, key: 'process.step6' }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary text-center mb-8 md:mb-12">
          {t('process.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="flex gap-3 md:gap-4 items-start bg-secondary/30 p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xl md:text-2xl font-cairo font-bold text-primary">{step.number}</span>
              </div>
              <p className="text-foreground font-cairo leading-relaxed pt-1 md:pt-2 text-sm md:text-base">
                {t(step.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
