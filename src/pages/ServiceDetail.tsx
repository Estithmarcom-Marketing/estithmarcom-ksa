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

// Establishment service images
import establishmentImg1 from "@/assets/service-details/establishment/establishment-services-1.png";
import establishmentImg2 from "@/assets/service-details/establishment/establishment-services-2.png";
import establishmentImg3 from "@/assets/service-details/establishment/establishment-services-3.png";

// Administrative service images
import administrativeImg1 from "@/assets/service-details/adminstration/administrative-services-1.png";
import administrativeImg2 from "@/assets/service-details/adminstration/administrative-services-2.png";
import administrativeImg3 from "@/assets/service-details/adminstration/administrative-services-3.png";

// Marketing service images
import marketingImg1 from "@/assets/service-details/marketing/marketing-and-administrative-consultations-1.png";
import marketingImg2 from "@/assets/service-details/marketing/marketing-and-administrative-consultations-2.png";
import marketingImg3 from "@/assets/service-details/marketing/marketing-and-administrative-consultations-3.png";

// Government service images
import governmentImg1 from "@/assets/service-details/government/government-services-and-licensing-assistance-1.png";
import governmentImg2 from "@/assets/service-details/government/government-services-and-licensing-assistance-2.png";
import governmentImg3 from "@/assets/service-details/government/government-services-and-licensing-assistance-3.png";

// Feasibility service images
import feasibilityImg1 from "@/assets/service-details/feasability/feasibility-study-1.png";
import feasibilityImg2 from "@/assets/service-details/feasability/feasibility-study-2.png";
import feasibilityImg3 from "@/assets/service-details/feasability/feasibility-study-3.png";

// Workspace service images
import workspaceImg1 from "@/assets/service-details/workspace/workspace-management-services-1.png";
import workspaceImg2 from "@/assets/service-details/workspace/workspace-management-services-2.png";
import workspaceImg3 from "@/assets/service-details/workspace/workspace-management-services-3.png";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  // Service data mapping
  const serviceData: Record<string, {
    titleKey: string;
    image: string;
    imageRight?: string;
    imageLeft?: string;
    imageBelow?: string;
    descriptionKey: string;
    detailKey: string;
  }> = {
    companyFormation: {
      titleKey: 'servicesPage.companyFormation.title',
      image: establishment,
      imageRight: establishmentImg1,
      imageLeft: establishmentImg3,
      imageBelow: establishmentImg2,
      descriptionKey: 'servicesPage.companyFormation.description',
      detailKey: 'servicesPage.companyFormation.detail'
    },
    legal: {
      titleKey: 'servicesPage.legal.title',
      image: administrative,
      imageRight: administrativeImg1,
      imageLeft: administrativeImg2,
      imageBelow: administrativeImg3,
      descriptionKey: 'servicesPage.legal.description',
      detailKey: 'servicesPage.legal.detail'
    },
    incubation: {
      titleKey: 'servicesPage.incubation.title',
      image: marketing,
      imageRight: marketingImg1,
      imageLeft: marketingImg2,
      imageBelow: marketingImg3,
      descriptionKey: 'servicesPage.incubation.description',
      detailKey: 'servicesPage.incubation.detail'
    },
    workspace: {
      titleKey: 'servicesPage.workspace.title',
      image: government,
      // imageRight: governmentImg1,
      // imageLeft: governmentImg2,
      // imageBelow: governmentImg3,
      imageRight: workspaceImg1,
      imageLeft: workspaceImg2,
      imageBelow: workspaceImg3,
      descriptionKey: 'servicesPage.workspace.description',
      detailKey: 'servicesPage.workspace.detail'
    },
    residency: {
      titleKey: 'servicesPage.residency.title',
      image: feasibility,
      imageRight: feasibilityImg1,
      imageLeft: feasibilityImg2,
      imageBelow: feasibilityImg3,
      descriptionKey: 'servicesPage.residency.description',
      detailKey: 'servicesPage.residency.detail'
    },
    government: {
      titleKey: 'servicesPage.government.title',
      image: workspace,
      // imageRight: workspaceImg1,
      // imageLeft: workspaceImg2,
      // imageBelow: workspaceImg3,
      imageRight: governmentImg1,
      imageLeft: governmentImg2,
      imageBelow: governmentImg3,
      descriptionKey: 'servicesPage.government.description',
      detailKey: 'servicesPage.government.detail'
    }
  };

  const service = serviceData[serviceId || 'companyFormation'];

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
              <img src={service.imageRight || service.image} alt="" className="w-full  object-cover " />
              <img src={service.imageLeft || service.image} alt="" className="w-full  object-cover " />
            </div>
            <div className="rounded-br-3xl overflow-hidden ">
              <img src={service.imageBelow || service.image} alt="" className="w-full h-48 object-cover" />
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
