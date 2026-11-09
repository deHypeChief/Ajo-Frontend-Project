import { reactive, readonly } from 'vue'

export type ToastVariant = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  variant: ToastVariant
  message: string
}

// One shared list, so any page or store can show a toast.
const toasts = reactive<ToastItem[]>([])
let nextId = 1

function dismiss(id: number) {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

function show(message: string, variant: ToastVariant = 'info', durationMs = 4000): number {
  const id = nextId++
  toasts.push({ id, variant, message })
  if (durationMs > 0) setTimeout(() => dismiss(id), durationMs)
  return id
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    show,
    dismiss,
    success: (message: string, durationMs?: number) => show(message, 'success', durationMs),
    error: (message: string, durationMs = 6000) => show(message, 'error', durationMs),
    info: (message: string, durationMs?: number) => show(message, 'info', durationMs),
  }
}
