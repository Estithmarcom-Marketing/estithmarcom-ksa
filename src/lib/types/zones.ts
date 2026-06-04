import { FAQType } from "./faq"

export interface ZoneType{
  id: number
  title: string
  image: string
  slug?: string
  faqs: FAQType[]
  content: string
}