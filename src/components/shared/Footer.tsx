import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  // Logo and Description Section
  const LogoSection = () => (
    <div className={`flex flex-col items-center md:items-${isRTL ? 'end' : 'start'} space-y-4`}>
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`text-${isRTL ? 'right' : 'left'}`}>
          <h3 className="text-xl md:text-2xl font-bold text-accent">{t('header.title')}</h3>
          <p className="text-sm">{t('header.subtitle')}</p>
          <p className="text-xs opacity-90">{t('header.incubator')}</p>
          <p className="text-xs opacity-75">{t('header.incubatorEn')}</p>
        </div>
        <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded flex items-center justify-center flex-shrink-0">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L8 8h3v6H9l4 6 4-6h-2V8h3l-4-6z" />
          </svg>
        </div>
      </div>
      <p className={`text-sm leading-relaxed text-center md:text-${isRTL ? 'right' : 'left'} max-w-xs`}>
        {t('footer.description')}
      </p>
    </div>
  );

  // Contact Information Section
  const ContactSection = () => (
    <div className={`text-center space-y-4`}>
      <h3 className="text-2xl md:text-3xl font-bold mb-6">{t('footer.contactInfo')}</h3>
      <div className="space-y-4">
        <div className={`flex items-center justify-center gap-3`}>
          <span className="text-base">{t('footer.location')}</span>
          <MapPin className="w-5 h-5" />
        </div>
        <div className={`flex items-center justify-center gap-3`}>
          <span className="text-base">{t('header.phone')}</span>
          <Phone className="w-5 h-5" />
        </div>
        <div className={`flex items-center justify-center gap-3`}>
          <span className="text-base">{t('header.email')}</span>
          <Mail className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  // Subscribe Section
  const SubscribeSection = () => (
    <div className={`flex flex-col items-center md:items-${isRTL ? 'start' : 'end'} space-y-4`}>
      <div className={`text-${isRTL ? 'left' : 'right'} space-y-3`}>
        <h4 className="text-xl md:text-2xl font-bold">{t('footer.subscribe')}</h4>
        <p className="text-sm opacity-90 max-w-xs">
          {t('footer.subscribeDesc')}
        </p>
      </div>
      <div className={`flex gap-2 w-full max-w-sm ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
        <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold whitespace-nowrap px-6">
          {t('footer.subscribeBtn')}
        </Button>
        <Input
          type="email"
          placeholder={t('footer.emailPlaceholder')}
          className={`${isRTL ? 'text-right' : 'text-left'} bg-white/10 border-white/20 text-white placeholder:text-white/60`}
        />
      </div>
    </div>
  );

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content - 3 Column Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start ${isRTL ? '' : ''}`}>
          {/* Column Order for RTL: Logo(right), Contact(center), Subscribe(left) */}
          {/* Column Order for LTR: Logo(left), Contact(center), Subscribe(right) */}

          {isRTL ? (
            <>
              <SubscribeSection />
              <ContactSection />
              <LogoSection />
            </>
          ) : (
            <>
              <LogoSection />
              <ContactSection />
              <SubscribeSection />
            </>
          )}
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#F5EFE7] text-primary py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
