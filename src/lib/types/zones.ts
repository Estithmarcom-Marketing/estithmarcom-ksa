import { FAQType } from "./faq"

export interface ZoneType{
  id: number
  title: string
  image: any
  slug?: string
  faqs: FAQType[]
  content: string
}