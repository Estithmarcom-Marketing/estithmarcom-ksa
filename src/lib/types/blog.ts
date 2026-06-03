import { CategoryType } from "./category"
import { PaginationType } from "./pagination"

export interface BlogType{
  id: number
  title: string
  description: string
  image: any
  slug?: string
  created_at?: string
  category: CategoryType
}

export interface BlogResType {
  blogs: BlogType[];
  meta?: PaginationType;
}