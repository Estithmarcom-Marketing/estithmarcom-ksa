import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import * as React from "react";

const cn = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const isRTL = language === "ar";

const ContactRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  isRTL: boolean;
}> = ({ icon, label, isRTL }) => (
  <div
    className={[
      "flex items-center gap-3",
      // في العربي نعكس اتجاه الصف عشان الأيقونة تطلع يمين النص
      isRTL ? "flex-row-reverse  justify-end" : "flex-row  justify-start",
    ].join(" ")}
  >
    <span className="shrink-0" hidden={isRTL} aria-hidden="true">{icon}</span>
    <span className="text-base">{label}</span>
    <span className="shrink-0" hidden={!isRTL} aria-hidden="true">{icon}</span>
  </div>
);



  const LogoSection = () => (
    <div
      className={cn(
        "flex flex-col items-center space-y-4",
        isRTL ? "md:items-start" : "md:items-end"
      )}
    >
      <div className={cn("flex items-center gap-3", isRTL ? "flex-row" : "flex-row")}>
        <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center flex-shrink-0">
          <img
            src="/logo-white.png"
            alt={t("header.title")}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <p
        className={cn(
          "text-sm leading-relaxed text-center max-w-xs",
          isRTL ? "md:text-right" : "md:text-left"
        )}
      >
        {t("footer.description")}
      </p>
    </div>
  );

  // Contact Section
const ContactSection = () => (
  <div className={isRTL ? "space-y-4 text-right" : "space-y-4 text-left"}>
    <h3 className={["text-2xl md:text-3xl font-bold mb-6", isRTL ? "text-right" : "text-left"].join(" ")}>
      {t("footer.contactInfo")}
    </h3>

    <div className="space-y-4">
      <ContactRow icon={<MapPin className="w-5 h-5" />} label={t("footer.location")} isRTL={isRTL} />
      <ContactRow icon={<Phone className="w-5 h-5" />} label={t("header.phone")} isRTL={isRTL} />
      <ContactRow icon={<Mail className="w-5 h-5" />} label={t("header.email")} isRTL={isRTL} />
    </div>
  </div>
);

  const SubscribeSection = () => (
    <div
      className={cn(
        "flex flex-col items-center space-y-4",
        isRTL ? "md:items-start" : "md:items-end"
      )}
    >
      <div className={cn(isRTL ? "text-left" : "text-right", "space-y-3")}>
        <h4 className="text-xl md:text-2xl font-bold">{t("footer.subscribe")}</h4>
        <p className="text-sm opacity-90 max-w-xs">{t("footer.subscribeDesc")}</p>
      </div>

      {/* RTL: button then input. LTR: input then button. */}
      <div
        className={cn(
          "flex gap-2 w-full max-w-sm",
          isRTL ? "flex-row" : "flex-row"
        )}
      >
        {isRTL ? (
          <>
            <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold whitespace-nowrap px-6">
              {t("footer.subscribeBtn")}
            </Button>
            <Input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              className={cn(
                "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                "text-right"
              )}
            />
          </>
        ) : (
          <>
            <Input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              className={cn(
                "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                "text-left"
              )}
            />
            <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold whitespace-nowrap px-6">
              {t("footer.subscribeBtn")}
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <footer className="bg-primary text-primary-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Grid naturally lays out from the inline-start side:
            - RTL (ar): first col appears on the right: Logo | Contact | Newsletter
            - LTR (en): first col appears on the left:  Logo | Contact | Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          <LogoSection />
          <ContactSection />
          <SubscribeSection />
        </div>
      </div>

      <div className="bg-[#F5EFE7] text-primary py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
