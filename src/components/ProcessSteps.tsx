const ProcessSteps = () => {
  const steps = [
    {
      number: 1,
      title: "تأسيس جميع أنواع الشركات وتجهيز جميع المعاملات لتأسيس الشركات"
    },
    {
      number: 2,
      title: "ربط المشاريع المحتضنة داخل الحاضنة مع بعضها البعض للاستفادة من خبراتها"
    },
    {
      number: 3,
      title: "توفير مكاتب مشتركة ومنفصلة وغرف اجتماعات لدعم الشركات ورواد الأعمال"
    },
    {
      number: 4,
      title: "إصدار الإقامة المميزة الأنسب لك"
    },
    {
      number: 5,
      title: "إنشاء نموذج أولي مع تطوير الفكرة إلى نموذج عمل واختبارها وتقديمها إلى السوق"
    },
    {
      number: 6,
      title: "إعداد دراسات الجدوى والخطط والاستراتيجيات المبنية من توافقية الأفكار مع رؤية المملكة للمشاريع الريادية"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-cairo font-bold text-primary text-center mb-12">
          دور حاضنة ومسرعة الأعمال استثماركوم
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div 
              key={step.number}
              className="flex gap-4 items-start bg-secondary/30 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-2xl font-cairo font-bold text-primary">{step.number}</span>
              </div>
              <p className="text-foreground font-cairo leading-relaxed pt-2">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;