import { CountryType } from "./country"
import { FAQType } from "./faq"
import { PaginationType } from "./pagination"

export interface ServiceFeatureType {
  id: number
  title: string
  description: string
}

export interface ServiceType{
  id: number
  icon: any
  title: string
  short_description: string
  slug?: string
  features_description?: string
  features?: ServiceFeatureType[]
  countries: CountryType[]
  faqs?: FAQType[]
}

export interface ServiceResType {
  services: ServiceType[];
  meta?: PaginationType;
}