import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-3xl font-cairo font-bold mb-6">معلومات الاتصال</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-end gap-3">
                <span className="font-cairo">السعودية</span>
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <span className="font-cairo">0551639995</span>
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <span className="font-cairo">info@estthmarkem.com</span>
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <p className="font-cairo text-sm leading-relaxed opacity-90 mb-6">
              لدعم المشاريع والشركات الناشئة من خلال خدمات تطوير الأعمال وخدمات المساحات الإفرادية ومساحات الأعمال المشتركة
            </p>

            <p className="font-cairo text-xs opacity-75">
              جميع الحقوق محفوظة لـ استثماركوم حاضنة ومسرعة الأعمال استثماركوم
            </p>
          </div>

          {/* Logo and Newsletter */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div>
                <h3 className="text-3xl font-cairo font-bold text-accent">استثماركوم</h3>
                <p className="text-sm font-cairo">Estithmar Com</p>
                <p className="text-xs font-cairo opacity-90">حاضنة ومسرعة الأعمال</p>
                <p className="text-xs font-cairo opacity-75">Business incubator and accelerator</p>
              </div>
              <div className="w-16 h-16 bg-accent rounded flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L8 8h3v6H9l4 6 4-6h-2V8h3l-4-6z"/>
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-cairo font-bold mb-3">الاشتراك</h4>
              <p className="text-sm font-cairo opacity-90 mb-4">
                اشترك في النشرة الإخبارية للحصول على آخر تجديث لنا
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <Button className="bg-accent hover:bg-accent/90 text-primary font-cairo">
                  اشترك
                </Button>
                <Input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="text-right font-cairo bg-white/10 border-white/20 text-white placeholder:text-white/60"
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