<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
  },
)
</script>

<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'is-loading': loading }]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <span class="btn__label"><slot /></span>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font: inherit;
  font-weight: var(--weight-semibold);
  cursor: pointer;
  transition:
    background-color var(--transition),
    border-color var(--transition),
    transform var(--transition);
}

.btn--md {
  min-height: 44px;
  padding: var(--space-2) var(--space-5);
  font-size: var(--text-md);
}

.btn--sm {
  min-height: 36px;
  padding: var(--space-1) var(--space-4);
  font-size: var(--text-sm);
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--color-surface-muted);
}

.btn--danger {
  background: var(--color-danger);
  color: var(--color-surface);
}
.btn--danger:hover:not(:disabled) {
  background: var(--color-danger-hover);
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.btn.is-loading {
  cursor: progress;
  opacity: 0.85;
}

.btn__spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--radius-full);
  animation: btn-spin 700ms linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
