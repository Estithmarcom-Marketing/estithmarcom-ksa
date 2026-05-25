import ResidencyDetailsClient from "./_components/residency-details-client"

export default function residencyPage(){
  const residency = {
    id: 1,
    title: "الإقامة المميزة",
    description:
      "تقدم الإقامة المميزة في السعودية مزايا استثنائية للمستثمرين ورجال الأعمال، بما في ذلك تسهيلات في الإجراءات الحكومية، وإمكانية الحصول على تأشيرات متعددة الدخول، وخدمات دعم متكاملة لتعزيز نجاح المشاريع الاستثمارية.",
    image: "/assets/blog_img.jpg",
  }
  return <ResidencyDetailsClient residency={residency} />
}