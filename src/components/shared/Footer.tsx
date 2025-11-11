import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className={`text-${isRTL ? 'right' : 'left'}`}>
            <h3 className="text-2xl md:text-3xl font-cairo font-bold mb-6">{t('footer.contactInfo')}</h3>
            
            <div className="space-y-4 mb-8">
              <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'} gap-3`}>
                <span className="font-cairo">{t('footer.location')}</span>
                <MapPin className="w-5 h-5" />
              </div>
              <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'} gap-3`}>
                <span className="font-cairo">{t('header.phone')}</span>
                <Phone className="w-5 h-5" />
              </div>
              <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'} gap-3`}>
                <span className="font-cairo">{t('header.email')}</span>
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <p className="font-cairo text-sm leading-relaxed opacity-90 mb-6">
              {t('footer.description')}
            </p>

            <p className="font-cairo text-xs opacity-75">
              {t('footer.rights')}
            </p>
          </div>

          {/* Logo and Newsletter */}
          <div className="text-center">
            <div className={`flex items-center justify-center gap-3 mb-6 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`text-${isRTL ? 'right' : 'left'}`}>
                <h3 className="text-2xl md:text-3xl font-cairo font-bold text-accent">{t('header.title')}</h3>
                <p className="text-sm font-cairo">{t('header.subtitle')}</p>
                <p className="text-xs font-cairo opacity-90">{t('header.incubator')}</p>
                <p className="text-xs font-cairo opacity-75">{t('header.incubatorEn')}</p>
              </div>
              <div className="w-14 h-14 md:w-16 md:h-16 bg-accent rounded flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L8 8h3v6H9l4 6 4-6h-2V8h3l-4-6z"/>
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-cairo font-bold mb-3">{t('footer.subscribe')}</h4>
              <p className="text-sm font-cairo opacity-90 mb-4">
                {t('footer.subscribeDesc')}
              </p>
              <div className={`flex gap-2 max-w-md mx-auto ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}>
                <Button className="bg-accent hover:bg-accent/90 text-primary font-cairo">
                  {t('footer.subscribeBtn')}
                </Button>
                <Input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')}
                  className={`${isRTL ? 'text-right' : 'text-left'} font-cairo bg-white/10 border-white/20 text-white placeholder:text-white/60`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
