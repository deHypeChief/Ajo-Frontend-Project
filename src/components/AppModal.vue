<script lang="ts">
// Runs once per module, so every modal instance gets its own title id.
let uid = 0
</script>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    closeLabel?: string
  }>(),
  { closeLabel: 'Close' },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const titleId = `app-modal-title-${++uid}`
const dialogRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

function close() {
  emit('update:modelValue', false)
}

function focusableItems(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

// Escape closes. Tab and Shift+Tab stay inside the dialog.
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation()
    close()
    return
  }
  if (event.key !== 'Tab') return

  const items = focusableItems()
  if (items.length === 0) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }
  const first = items[0]!
  const last = items[items.length - 1]!
  const active = document.activeElement

  if (event.shiftKey && (active === first || active === dialogRef.value)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      previouslyFocused = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      await nextTick()
      const target = focusableItems()[0] ?? dialogRef.value
      target?.focus()
    } else {
      document.body.style.overflow = ''
      previouslyFocused?.focus()
      previouslyFocused = null
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-backdrop" @click.self="close" @keydown="onKeydown">
        <div
          ref="dialogRef"
          class="modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
        >
          <header class="modal__header">
            <h2 :id="titleId" class="modal__title">{{ title }}</h2>
            <button class="modal__close" type="button" :aria-label="closeLabel" @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </header>
          <div class="modal__body"><slot /></div>
          <footer v-if="$slots.footer" class="modal__footer"><slot name="footer" /></footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  background: var(--color-overlay);
}

.modal {
  width: 100%;
  max-width: 480px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.modal__title {
  font-size: var(--text-lg);
}

.modal__close {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font-size: var(--text-xl);
  line-height: 1;
  cursor: pointer;
}
.modal__close:hover {
  background: var(--color-surface-muted);
}

.modal__body {
  padding: var(--space-5);
  overflow-y: auto;
}

.modal__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-muted);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
