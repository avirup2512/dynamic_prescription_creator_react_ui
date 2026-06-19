import { useLoaderService } from "@/services/loader/LoaderProvider"

export function useLoader() {
  return useLoaderService()
}
