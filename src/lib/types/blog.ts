import { CategoryType } from "./category"
import { PaginationType } from "./pagination"

export interface BlogType{
  id: number
  title: string
  description: string
  image: string
  slug?: string
  created_at?: string
  category: CategoryType
  meta_title?: string
  meta_description?: string
}

export interface BlogResType {
  blogs: BlogType[];
  meta?: PaginationType;
}