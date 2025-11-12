import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Youtube, Instagram, MapPin, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="flex justify-between items-center">
          {/* Logo and Navigation Group */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <img
              src="/logo-white.png"
              alt={t('header.title')}
              className="w-24 h-24 md:w-18 md:h-18 object-contain flex-shrink-0"
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 font-cairo font-semibold text-sm md:text-base">
              <a href="/" className="hover:text-accent transition-colors">{t('nav.home')}</a>
              <a href="/services" className="hover:text-accent transition-colors">{t('nav.services')}</a>
              <a href="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</a>
              {/* <a href="#incubator" className="hover:text-accent transition-colors">{t('nav.bookHall')}</a> */}
              <a href="/about" className="hover:text-accent transition-colors">{t('nav.about')}</a>
              <a href="#sectors" className="hover:text-accent transition-colors">{t('nav.sectors')}</a>
            </nav>
          </div>

          {/* Desktop Request Button */}
          <Button className="hidden lg:block text-white hover:bg-accent/90 font-bold border px-6">
            {t('header.requestService')}
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Side Menu */}
            <div className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-full w-80 max-w-[85vw] bg-primary text-primary-foreground z-50 shadow-xl lg:hidden transform transition-transform duration-300 ease-in-out`}>
              {/* Header with Close Button */}
              <div className="flex justify-between items-center p-4 border-b border-primary-foreground/20">
                <img
                  src="/logo-white.png"
                  alt={t('header.title')}
                  className="w-16 h-16 object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-6 gap-2 font-cairo font-semibold text-base">
                <a
                  href="/"
                  className="hover:text-accent hover:bg-primary-foreground/10 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.home')}
                </a>
                <a
                  href="/services"
                  className="hover:text-accent hover:bg-primary-foreground/10 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.services')}
                </a>
                <a
                  href="/contact"
                  className="hover:text-accent hover:bg-primary-foreground/10 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.contact')}
                </a>
                <a
                  href="/about"
                  className="hover:text-accent hover:bg-primary-foreground/10 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.about')}
                </a>
                <a
                  href="#sectors"
                  className="hover:text-accent hover:bg-primary-foreground/10 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.sectors')}
                </a>

                <Button className="mt-4 text-white hover:bg-accent/90 font-bold border w-full py-6">
                  {t('header.requestService')}
                </Button>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
