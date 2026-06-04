import { PaginationType } from "./pagination";

export interface ResidencyType {
  id: number;
  title: string;
  description: string;
  image: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface ResidencyResType {
  residencies: ResidencyType[];
  meta?: PaginationType;
}

export interface ResidencySiteMapType {
  id: number;
  meta_title_ar: string;
  meta_title_en: string;
  description: string;
  slug_ar: string;
  slug_en: string;
  meta_description_ar: string;
  meta_description_en: string;
}
