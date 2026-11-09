<script setup lang="ts">
import { useToast } from '../composables/useToast'
import AppToast from './AppToast.vue'

const { toasts, dismiss } = useToast()
</script>

<template>
  <div class="toast-host">
    <TransitionGroup name="toast">
      <AppToast
        v-for="toast in toasts"
        :key="toast.id"
        :variant="toast.variant"
        :message="toast.message"
        @close="dismiss(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-host {
  position: fixed;
  right: var(--space-4);
  bottom: var(--space-4);
  left: var(--space-4);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-3);
  pointer-events: none;
}

.toast-host > * {
  pointer-events: auto;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity var(--transition),
    transform var(--transition);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
