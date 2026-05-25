"use client"

import PagesHero from "@/components/global/pages-hero"
import { useLocale } from "@/hooks/use-locale"
import { getTranslator, TranslationKey } from "@/lib/i18n"
import { ResidencyType } from "@/lib/types/residency"
import ResidencyForm from "./residency-form"

export default function ResidencyDetailsClient({ residency }: { residency: ResidencyType }) {
  const locale = useLocale()
  const { t } = getTranslator(locale)

  const countries = [
    { id: 1, name: t("country.saudi" as TranslationKey) },
    { id: 2, name: t("country.jordan" as TranslationKey) },
    { id: 3, name: t("country.egypt" as TranslationKey) },
  ];

  return (
    <div>
      <PagesHero title={residency.title} desc="تعرف على تفاصيل الإقامات الخاصة باستثماركوم" />
      <section className="container py-[100px]! flex flex-col lg:flex-row items-start gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-primary">{residency.title}</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              تعد المملكة العربية السعودية وجهة استثمارية رائدة في المنطقة، حيث توفر برامج إقامة متنوعة تلبي تطلعات المستثمرين ورواد الأعمال والمواهب العالمية. تهدف هذه البرامج إلى تعزيز البيئة الاستثمارية وتسهيل ممارسة الأعمال في المملكة تماشياً مع رؤية 2030.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">مميزات الإقامة في المملكة</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>حرية التنقل من وإلى المملكة دون الحاجة لتأشيرة خروج وعودة.</li>
              <li>إمكانية تملك العقارات للأغراض السكنية والتجارية والصناعية.</li>
              <li>العمل في منشآت القطاع الخاص والانتقال بينها.</li>
              <li>استقدام العمالة المنزلية حسب الحاجة.</li>
              <li>مزايا خاصة لأفراد الأسرة تشمل التعليم والرعاية الصحية.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">أنواع برامج الإقامة المتاحة</h2>
            <p>
              تتنوع البرامج المتاحة لتشمل الإقامة الدائمة والإقامة المؤقتة، بالإضافة إلى برامج مخصصة للمستثمرين بنظام التملك الكامل للمشاريع، وبرامج الكفاءات الاستثنائية التي تستهدف العلماء والباحثين والمبدعين في مختلف المجالات.
            </p>

            <h3 className="text-xl font-semibold">1. إقامة الكفاءات الاستثنائية</h3>
            <p>
              تستهدف الكفاءات العلمية والإدارية والبحثية، الذين لديهم قدرات استثنائية أو تخصصات نادرة تسهم في نقل المعرفة وتوطين الخبرات.
            </p>

            <h3 className="text-xl font-semibold">2. إقامة الموهبة</h3>
            <p>
              موجهة للمبدعين والمبتكرين في المجالات الثقافية والرياضية، الذين لديهم إنجازات عالمية أو جوائز مرموقة في مجالات تخصصهم.
            </p>

            <h3 className="text-xl font-semibold">3. إقامة مستثمر أعمال</h3>
            <p>
              مخصصة للمستثمرين الراغبين في تأسيس أعمال تجارية في المملكة، مع الحصول على مزايا استثمارية وتسهيلات حكومية واسعة.
            </p>

            <h3 className="text-xl font-semibold">4. إقامة مالك عقار</h3>
            <p>
              تمنح لملاك العقارات السكنية بقيمة محددة، مما يتيح لهم الاستقرار والاستمتاع بجودة الحياة في المملكة.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">خطوات التقديم</h2>
            <p>
              تبدأ عملية التقديم من خلال منصة إقامة، حيث يتم تقديم الطلب وإرفاق كافة المستندات المطلوبة، تليها مرحلة المراجعة والتدقيق، وصولاً إلى إصدار الإقامة النهائية بعد استيفاء كافة الشروط والمتطلبات.
            </p>
            <p>
              نحن في استثماركوم نقدم لك الدعم الكامل في كافة مراحل التقديم، بدءاً من اختيار البرنامج الأنسب لك وصولاً إلى الحصول على الإقامة ومتابعة كافة الإجراءات القانونية والإدارية.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">المتطلبات العامة</h2>
            <p>
              تشمل المتطلبات العامة وجود جواز سفر ساري المفعول، تقرير طبي يثبت الخلو من الأمراض المعدية، سجل جنائي نظيف، وإثبات الملاءة المالية في بعض أنواع الإقامات.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">لماذا تختار استثماركوم؟</h2>
            <p>
              خبرتنا الواسعة في السوق السعودي تجعلنا الشريك الأمثل لرحلتك الاستثمارية. فريقنا يضم نخبة من المستشارين القانونيين والخبراء الإداريين الذين يضمنون لك تجربة سلسة وناجحة.
            </p>
            <p>
              انضم إلى آلاف المستثمرين الذين حققوا طموحاتهم في المملكة من خلال خدماتنا المتميزة. نحن نؤمن بأن نجاحك هو نجاحنا، ونسعى دائماً لتقديم أفضل الحلول المبتكرة.
            </p>
            <p>
              للمزيد من المعلومات حول تفاصيل كل برنامج والشروط الخاصة به، يمكنك التواصل معنا عبر النموذج المرفق أو الاتصال بنا مباشرة. فريقنا جاهز للإجابة على كافة استفساراتكم وتقديم المشورة اللازمة.
            </p>
          </div>
        </div>

        <div id="residencyForm" className="lg:w-[600px] w-full lg:sticky lg:top-30 scroll-mt-20 bg-white special-shadow rounded-xl px-6 py-10 self-start">
          <ResidencyForm countries={countries} residency={residency} />
        </div>
      </section>
    </div>
  )
}
