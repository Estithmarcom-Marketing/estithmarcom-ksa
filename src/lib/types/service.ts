import { CountryType } from "./country"
import { FAQType } from "./faq"
import { PaginationType } from "./pagination"

export interface ServiceFeatureType {
  id: number
  title: string
  description: string
  image: string
}

export interface ServiceType{
  id: number
  image: any
  title: string
  short_description: string
  slug?: string
  features_description?: string
  features?: ServiceFeatureType[]
  countries: CountryType[]
  faqs?: FAQType[]
  meta_title?: string
  meta_description?: string
}

export interface ServiceResType {
  services: ServiceType[];
  meta?: PaginationType;
}