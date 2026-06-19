import { useToastService } from "@/services/toast/ToastProvider"

export function useToast() {
  return useToastService()
}
