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
}