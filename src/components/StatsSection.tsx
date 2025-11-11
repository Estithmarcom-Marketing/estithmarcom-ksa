import { Briefcase, Building, CheckCircle } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      label: "تأسيس الشركات",
      value: "+550",
      color: "text-accent"
    },
    {
      icon: Building,
      label: "الإقامة المميزة",
      value: "+180",
      color: "text-accent"
    },
    {
      icon: CheckCircle,
      label: "الاحتضان",
      value: "+20",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className={`w-16 h-16 mx-auto mb-4 ${stat.color}`} />
              <h3 className="text-lg font-cairo font-semibold text-foreground mb-2">
                {stat.label}
              </h3>
              <p className={`text-4xl font-cairo font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;