import { PaginationType } from "./pagination";

export interface ResidencyType {
  id: number;
  title: string;
  description: string;
  image: any;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface ResidencyResType {
  residencies: ResidencyType[];
  meta?: PaginationType;
}
