import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import establishment from "@/assets/services/establishment.jpg";
import administrative from "@/assets/services/administrative.jpg";
import feasibility from "@/assets/services/feasibility.jpg";
import government from "@/assets/services/government.jpg";
import marketing from "@/assets/services/marketing.jpg";
import workspace from "@/assets/services/workspace.jpg";
import professionalPerson from "@/assets/professional-person.jpg";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  // Service data mapping
  const serviceData: Record<string, { 
    titleKey: string; 
    image: string;
    descriptionKey: string;
    detailKey: string;
  }> = {
    establishment: {
      titleKey: 'servicesPage.establishment.title',
      image: establishment,
      descriptionKey: 'servicesPage.establishment.description',
      detailKey: 'servicesPage.establishment.detail'
    },
    administrative: {
      titleKey: 'servicesPage.administrative.title',
      image: administrative,
      descriptionKey: 'servicesPage.administrative.description',
      detailKey: 'servicesPage.administrative.detail'
    },
    feasibility: {
      titleKey: 'servicesPage.feasibility.title',
      image: feasibility,
      descriptionKey: 'servicesPage.feasibility.description',
      detailKey: 'servicesPage.feasibility.detail'
    },
    government: {
      titleKey: 'servicesPage.government.title',
      image: government,
      descriptionKey: 'servicesPage.government.description',
      detailKey: 'servicesPage.government.detail'
    },
    marketing: {
      titleKey: 'servicesPage.marketing.title',
      image: marketing,
      descriptionKey: 'servicesPage.marketing.description',
      detailKey: 'servicesPage.marketing.detail'
    },
    workspace: {
      titleKey: 'servicesPage.workspace.title',
      image: workspace,
      descriptionKey: 'servicesPage.workspace.description',
      detailKey: 'servicesPage.workspace.detail'
    }
  };

  const service = serviceData[serviceId || 'establishment'];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section with Diagonal Border */}
      <section
        className=" bg-primary pt-32 pb-48 overflow-hidden"
        style={{ clipPath: isRTL ? 'polygon(0 0, 100% 0, 100% 100%, 0 85%)' : 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      >
        <div className="container mx-auto px-4 text-center text-white ">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {t('serviceDetail.hero.services')}
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold">
            {t(service.titleKey)}
            <span className="block h-1 w-32 bg-accent mx-auto mt-6"></span>
          </h1>
        </div>
      </section>

      {/* Content Section with Images */}
      <section className="container mx-auto px-4 mb-16 mt-32">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Right Text - Always on the right */}
          <div className={`space-y-3 order-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-foreground leading-relaxed text-lg">
              {t(service.descriptionKey)}
            </p>
          </div>

          {/* Left Images - Always on the left */}
          <div className="space-y-6 order-2">
            <div className=" overflow-hidden  flex justify-between gap-6 h-48">
              <img src={service.image} alt="" className="w-full  object-cover " />
              <img src={service.image} alt="" className="w-full  object-cover " />
            </div>
            <div className="rounded-br-3xl overflow-hidden ">
              <img src={service.image} alt="" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Purple Box with Yellow Border */}
      <section className="container mx-auto px-4 mb-16">
        <div className="relative bg-primary rounded-tl-[60px] rounded-br-[60px] p-8 md:p-12  ">
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-white leading-relaxed text-lg">
              {t(service.descriptionKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Request Service Form Section */}
      <section className="container mx-auto px-4 mb-16 max-w-7xl">
        <div className="relative rounded-3xl border-4 border-accent overflow-hidden bg-background">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Image */}
            <div className="order-1 md:order-2 flex items-center justify-center p-8">
              <img
                src={professionalPerson}
                alt=""
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>

            {/* Right Form */}
            <div className={`order-2 md:order-1 p-6 md:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`bg-accent   px-8 py-4 inline-block mb-8 ${isRTL ? "-mr-8 rounded-bl-3xl"  : "-ml-8 rounded-br-3xl" } `}>
                <h3 className="text-primary  font-bold text-2xl md:text-3xl">
                  {t('serviceDetail.requestService')}
                </h3>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder={t('serviceDetail.form.name')}
                    className="w-full px-6 py-4 rounded-full border-2 border-black bg-background "
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder={t('serviceDetail.form.phone')}
                    className="w-full px-6 py-4 rounded-full border-2 border-black bg-background "
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t('serviceDetail.form.email')}
                    className="w-full px-6 py-4 rounded-full border-2 border-black bg-background "
                  />
                </div>
                <div>
                  <textarea
                    placeholder={t('serviceDetail.form.notes')}
                    rows={4}
                    className="w-full px-6 py-4 rounded-3xl border-2 border-black bg-background  resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full  font-bold text-lg transition-all"
                >
                  {t('serviceDetail.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
