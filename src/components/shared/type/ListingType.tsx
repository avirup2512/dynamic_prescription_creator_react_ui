export type ListingColumn<T> = {
  key: keyof T
  label: string
  render?: (item: T) => React.ReactNode
}

export type ListingAction<T> = {
  label: string
  icon?: React.ReactNode
  onClick?: (item: T) => void
}

export type ListingPageProps<T extends { id: string | number }> = {
  title: string
  description?: string
  createLabel?: string
  searchPlaceholder?: string
  columns: ListingColumn<T>[]
  data: T[]
  actions?: ListingAction<T>[]
  onCreate?: () => void
}