<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'success' | 'error' | 'info'
    message: string
    dismissible?: boolean
  }>(),
  { variant: 'info', dismissible: true },
)

const emit = defineEmits<{ (e: 'close'): void }>()

// A symbol next to the colour, so meaning never depends on colour alone.
const icon = computed(() => ({ success: '✓', error: '!', info: 'i' })[props.variant])
</script>

<template>
  <div class="toast" :class="`toast--${variant}`" :role="variant === 'error' ? 'alert' : 'status'">
    <span class="toast__icon" aria-hidden="true">{{ icon }}</span>
    <p class="toast__message">{{ message }}</p>
    <button v-if="dismissible" class="toast__close" type="button" aria-label="Dismiss message" @click="emit('close')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 240px;
  max-width: 420px;
  padding: var(--space-3) var(--space-4);
  border: 2px solid currentColor;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  background: var(--color-surface);
}

.toast--success {
  color: var(--color-success);
  background: var(--color-success-bg);
}
.toast--error {
  color: var(--color-danger);
  background: var(--color-danger-bg);
}
.toast--info {
  color: var(--color-info);
  background: var(--color-info-bg);
}

.toast__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border: 2px solid currentColor;
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
}

.toast__message {
  flex: 1;
  color: var(--color-text);
  font-size: var(--text-sm);
}

.toast__close {
  flex: none;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text);
  font-size: var(--text-lg);
  line-height: 1;
  cursor: pointer;
}
.toast__close:hover {
  background: var(--color-surface-muted);
}
</style>
