export type ServiceTypeItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
};

export type ServicesType = {
  [category: string]: ServiceTypeItem[];
};

export const services_type: ServicesType = {
  "services.categories.commerce": [
    {
      id: 1,
      title: "services.commerce.renew_cr.title",
      description: "services.commerce.renew_cr.desc",
      icon: "renew-cr",
      slug: "تجديد السجل التجاري",
    },
    {
      id: 2,
      title: "services.commerce.edit_cr.title",
      description: "services.commerce.edit_cr.desc",
      icon: "edit-cr",
      slug: "تعديل السجل التجاري",
    },
    {
      id: 3,
      title: "services.commerce.new_cr.title",
      description: "services.commerce.new_cr.desc",
      icon: "new-cr",
      slug: "إصدار سجل تجاري جديد",
    },
    {
      id: 4,
      title: "services.commerce.cancel_cr.title",
      description: "services.commerce.cancel_cr.desc",
      icon: "cancel-cr",
      slug: "إلغاء السجل التجاري",
    },
  ],
  "services.categories.hr": [
    {
      id: 5,
      title: "services.hr.work_visa.title",
      description: "services.hr.work_visa.desc",
      icon: "work-visa",
      slug: "استخراج تأشيرة عمل",
    },
    {
      id: 6,
      title: "services.hr.renew_work.title",
      description: "services.hr.renew_work.desc",
      icon: "renew-work",
      slug: "تجديد رخصة العمل",
    },
    {
      id: 7,
      title: "services.hr.transfer.title",
      description: "services.hr.transfer.desc",
      icon: "transfer",
      slug: "نقل كفالة",
    },
    {
      id: 8,
      title: "services.hr.exit_visa.title",
      description: "services.hr.exit_visa.desc",
      icon: "exit-visa",
      slug: "تأشيرة خروج وعودة",
    },
  ],
  "services.categories.municipal": [
    {
      id: 9,
      title: "services.municipal.building_permit.title",
      description: "services.municipal.building_permit.desc",
      icon: "building-permit",
      slug: "رخصة البناء",
    },
    {
      id: 10,
      title: "services.municipal.commercial_license.title",
      description: "services.municipal.commercial_license.desc",
      icon: "commercial-license",
      slug: "رخصة تجارية",
    },
    {
      id: 11,
      title: "services.municipal.completion_cert.title",
      description: "services.municipal.completion_cert.desc",
      icon: "completion-cert",
      slug: "شهادة إتمام البناء",
    },
    {
      id: 12,
      title: "services.municipal.survey_map.title",
      description: "services.municipal.survey_map.desc",
      icon: "survey-map",
      slug: "مخطط مساحي",
    },
  ],
};
