const PartnersSection = () => {
  const partners = [
    "Tech Maintain",
    "مطاعم الروضة",
    "إتجاف",
    "سابا",
    "LOZOOCAR",
    "رمتان",
    "وجه بالفهم",
    "تقنية معاملات"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-cairo font-bold text-primary text-center mb-12">
          شركاؤنا في النجاح
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="w-24 h-24 bg-secondary/50 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <span className="text-xs font-cairo font-semibold text-primary text-center px-2">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;