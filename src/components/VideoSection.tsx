import { Play, Pause, Plus } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-purple-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-cairo font-bold text-white mb-4">
            كل ما يحتاجه الناجحون
            <br />
            في عالم الأعمال
          </h2>
          <p className="text-white/90 font-cairo text-lg">
            تعرف على آراء ومقترحات عملاءنا
            <br />
            والمشاهير في حاضنة أعمال استثماركوم
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-[9/16] md:aspect-video bg-primary/50 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/90 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L8 8h3v6H9l4 6 4-6h-2V8h3l-4-6z"/>
                  </svg>
                </div>
                <h3 className="text-4xl font-cairo font-bold text-accent mb-2">استثماركوم</h3>
                <p className="text-white font-cairo text-xl mb-1">Estithmar Com</p>
                <p className="text-accent/90 font-cairo text-sm mb-1">حاضنة ومسرعة الأعمال</p>
                <p className="text-white/70 font-cairo text-xs">Business incubator and accelerator</p>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Play className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Pause className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;