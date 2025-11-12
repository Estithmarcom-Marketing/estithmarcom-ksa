import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Youtube, Instagram, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top Bar */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm flex-wrap gap-2">
            <div className="flex items-center gap-4 md:gap-6">
              <a href={`tel:${t('header.phone')}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-cairo">{t('header.phone')}</span>
              </a>
              <a href={`mailto:${t('header.email')}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-cairo hidden sm:inline">{t('header.email')}</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-cairo hidden sm:inline">{t('header.followUs')}</span>
              <div className="flex gap-3">
                <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="Location">
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
              <select
                className="bg-transparent border border-primary-foreground/30 rounded px-2 py-1 text-xs font-cairo cursor-pointer"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ar' | 'en')}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">

          <div className="flex w-100">
            <div className="flex items-center gap-3 order-3 lg:order-2 ">
              <img
                src="/logo-white.png"
                alt={t('header.title')}
                className="w-24 h-24 md:w-18 md:h-18 object-contain flex-shrink-0"
              />
            </div>

            <nav className="flex items-center gap-4 md:gap-8 font-cairo font-semibold text-sm md:text-base order-2 lg:order-3 w-full lg:w-auto justify-center lg:mx-5 lg:px-5">
              <a href="/" className="hover:text-accent transition-colors">{t('nav.home')}</a>
              <a href="/services" className="hover:text-accent transition-colors">{t('nav.services')}</a>
              <a href="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</a>
              {/* <a href="#incubator" className="hover:text-accent transition-colors">{t('nav.bookHall')}</a> */}
              <a href="/about" className="hover:text-accent transition-colors">{t('nav.about')}</a>
              <a href="#sectors" className="hover:text-accent transition-colors">{t('nav.sectors')}</a>
            </nav>
          </div>

          <Button className=" order-4 text-white hover:bg-accent/90  font-bold border px-6">
            {t('header.requestService')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
