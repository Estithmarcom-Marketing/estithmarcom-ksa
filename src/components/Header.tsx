import { Button } from "@/components/ui/button";
import { Phone, Mail, Facebook, Youtube, Instagram, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top Bar */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:0551639995" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-cairo">0551639995</span>
              </a>
              <a href="mailto:info@estthmarkem.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-cairo">info@estthmarkem.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-cairo">تابعنا على:</span>
              <div className="flex gap-3">
                <a href="#" className="hover:text-accent transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
              <select className="bg-transparent border border-primary-foreground/30 rounded px-2 py-1 text-xs font-cairo">
                <option>العربية</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Button className="bg-accent hover:bg-accent/90 text-primary font-cairo font-bold rounded-full px-6">
            اطلب الخدمة
          </Button>
          
          <nav className="flex items-center gap-8 font-cairo font-semibold">
            <a href="#contact" className="hover:text-accent transition-colors">التواصل</a>
            <a href="#incubator" className="hover:text-accent transition-colors">حجز قاعة</a>
            <a href="#about" className="hover:text-accent transition-colors">من نحن</a>
            <a href="#sectors" className="hover:text-accent transition-colors">القطاعات</a>
            <a href="#services" className="hover:text-accent transition-colors">الخدمات</a>
            <a href="#" className="hover:text-accent transition-colors">الرئيسية</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h1 className="text-2xl font-cairo font-bold text-accent">استثماركوم</h1>
              <p className="text-xs font-cairo opacity-90">Estithmar Com</p>
            </div>
            <div className="w-12 h-12 bg-accent rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L8 8h3v6H9l4 6 4-6h-2V8h3l-4-6z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;