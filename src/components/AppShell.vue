<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ToastHost from './ToastHost.vue'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/members', label: 'Members' },
  { to: '/cycle', label: 'Cycle' },
  { to: '/setup', label: 'Setup' },
  { to: '/settings', label: 'Settings' },
  { to: '/kit', label: 'Kit' },
]
</script>

<template>
  <div class="shell">
    <a class="shell__skip" href="#main">Skip to content</a>

    <header class="shell__header">
      <div class="shell__bar">
        <span class="shell__brand">Ajo Circle</span>
        <nav aria-label="Main">
          <ul class="shell__nav">
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to" class="shell__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main id="main" class="shell__main"><slot /></main>

    <ToastHost />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
}

.shell__skip {
  position: absolute;
  left: var(--space-3);
  top: -100px;
  z-index: var(--z-modal);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.shell__skip:focus {
  top: var(--space-3);
}

.shell__header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.shell__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2) var(--space-5);
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-3) var(--space-4);
}

.shell__brand {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
}

.shell__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.shell__link {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-weight: var(--weight-semibold);
  text-decoration: none;
}
.shell__link:hover {
  background: var(--color-surface-muted);
  color: var(--color-text);
}
.shell__link.router-link-active {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.shell__main {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-5) var(--space-4) var(--space-7);
}
</style>
