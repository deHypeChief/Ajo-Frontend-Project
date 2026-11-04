<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'outlined' | 'elevated'
  }>(),
  { variant: 'outlined' },
)
</script>

<template>
  <section class="card" :class="`card--${variant}`">
    <header v-if="$slots.header" class="card__header"><slot name="header" /></header>
    <div class="card__body"><slot /></div>
    <footer v-if="$slots.footer" class="card__footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  color: var(--color-text);
  overflow: hidden;
}

.card--outlined {
  border: 2px solid var(--color-border);
}

.card--elevated {
  border: 2px solid transparent;
  box-shadow: var(--shadow-md);
}

.card__header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
  font-weight: var(--weight-semibold);
}

.card__body {
  padding: var(--space-5);
}

.card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-muted);
}
</style>
