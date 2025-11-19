import { useLanguage } from "@/contexts/LanguageContext";


const VideoHeading = () => {
  const { t } = useLanguage();

  return (
    <>
      <h2 className="text-3xl md:text-3xl font-bold text-accent mb-4">
        {t('video.title1')}
        <br />
        {t('video.title2')}
      </h2>
      <p className="text-white/90 text-base md:text-lg">
        {t('video.description1')}
        <br />
        {t('video.description2')}
      </p>
    </>
  );
};

export default VideoHeading;
