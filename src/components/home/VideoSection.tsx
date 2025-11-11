import { Play, Pause, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-purple-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-cairo font-bold text-white mb-4">
            {t('video.title1')}
            <br />
            {t('video.title2')}
          </h2>
          <p className="text-white/90 font-cairo text-base md:text-lg">
            {t('video.description1')}
            <br />
            {t('video.description2')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-[9/16] md:aspect-video bg-primary/50 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/90 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L8 8h3v6H9l4 6 4-6h-2V8h3l-4-6z"/>
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-cairo font-bold text-accent mb-2">{t('header.subtitle')}</h3>
                <p className="text-white font-cairo text-lg md:text-xl mb-1">{t('header.title')}</p>
                <p className="text-accent/90 font-cairo text-xs md:text-sm mb-1">{t('header.incubator')}</p>
                <p className="text-white/70 font-cairo text-xs">{t('header.incubatorEn')}</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
              <button className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Pause className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Plus className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
