<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { useMembersStore } from '@/stores/member'
import type { StoreError } from '@/stores/member'

const members = useMembersStore()

onMounted(() => {
  members.load()
})

// 'idle' is the moment before load() starts. Treat it as loading so nothing flashes.
const isLoading = computed(() => members.status === 'idle' || members.status === 'loading')

// The store gives a code. The words people read are written here.
const errorMessages: Record<StoreError, string> = {
  NETWORK: "We couldn't reach the server. Please try again.",
  VALIDATION: 'Something was wrong with the request. Please try again.',
  NOT_FOUND: "We couldn't find that. Please try again.",
  UNKNOWN: 'Something went wrong. Please try again.',
}
const errorText = computed(() => errorMessages[members.error ?? 'UNKNOWN'])

function formatPhone(phone: string): string {
  return /^\d{11}$/.test(phone)
    ? `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`
    : phone
import { onMounted, reactive } from 'vue'
import { useMembersStore } from '@/stores/member'
import { useDevStore } from '@/stores/dev'

const members = useMembersStore()
const dev = useDevStore()
const isDev = import.meta.env.DEV
const form = reactive({
  name: '',
  phone: '',
  position: ''
})

onMounted(() => members.load())

async function submit() {
  const ok = await members.add({name: form.name, phone: form.phone })
  if (ok) {
    form.name = ''
    form.phone = ''
  }
}

async function resetAll() {
  dev.reset()
  await members.load()
}
</script>

<template>
  <section class="members" aria-labelledby="members-title">
    <h1 id="members-title" class="members__title">Members</h1>

    <!-- 1. Loading: skeleton -->
    <div v-if="isLoading" class="skeleton" role="status" aria-live="polite">
      <span class="sr-only">Loading members…</span>
      <div v-for="n in 5" :key="n" class="skeleton__row" aria-hidden="true">
        <span class="skeleton__avatar" />
        <span class="skeleton__lines">
          <span class="skeleton__bar skeleton__bar--name" />
          <span class="skeleton__bar skeleton__bar--phone" />
        </span>
      </div>
    </div>

    <!-- 2. Error, with Retry -->
    <div v-else-if="members.status === 'error'" class="state state--error" role="alert">
      <span class="state__icon" aria-hidden="true">!</span>
      <h2 class="state__title">Couldn't load members</h2>
      <p class="state__text">{{ errorText }}</p>
      <AppButton @click="members.load()">Retry</AppButton>
    </div>

    <!-- 3. Empty -->
    <div v-else-if="members.isEmpty" class="state">
      <span class="state__icon" aria-hidden="true">+</span>
      <h2 class="state__title">No members yet</h2>
      <p class="state__text">Add your first member.</p>
    </div>

    <!-- 4. Full list -->
    <ul v-else class="member-list">
      <li v-for="member in members.items" :key="member.id" class="member">
        <span class="member__position"><span class="sr-only">Position </span>{{ member.position }}</span>
        <span class="member__details">
          <span class="member__name">{{ member.name }}</span>
          <span class="member__phone">{{ formatPhone(member.phone) }}</span>
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.members {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.members__title {
  font-size: var(--text-xl);
}

/* Full list */
.member-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.member {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
}

.member__position {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border: 2px solid var(--color-text);
  border-radius: var(--radius-full);
  font-weight: var(--weight-semibold);
}

.member__details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.member__name {
  font-weight: var(--weight-semibold);
}

.member__phone {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Empty and error panels */
.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-4);
  text-align: center;
  background: var(--color-surface);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
}

.state--error {
  background: var(--color-danger-bg);
  border: 2px solid var(--color-danger);
}

.state__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 2px solid currentColor;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
}

.state--error .state__icon {
  color: var(--color-danger);
}

.state__title {
  font-size: var(--text-lg);
}

.state__text {
  color: var(--color-text-muted);
}

.state--error .state__text {
  color: var(--color-text);
}

/* Loading skeleton */
.skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skeleton__row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
}

.skeleton__avatar,
.skeleton__bar {
  background: var(--color-surface-muted);
  animation: skeleton-pulse 1.2s ease-in-out infinite;
}

.skeleton__avatar {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
}

.skeleton__lines {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
}

.skeleton__bar {
  height: 12px;
  border-radius: var(--radius-full);
}

.skeleton__bar--name {
  width: 40%;
}

.skeleton__bar--phone {
  width: 25%;
}

@keyframes skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Text for screen readers only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>
  <main>
    <h1>Members</h1>
     
    <section v-if="isDev">
      <strong>Dev:</strong> failure mode: {{ dev.mode }}
      <button @click="dev.setMode('random')">random</button>
      <button @click="dev.setMode('always')">always</button>
      <button @click="dev.setMode('off')">off</button>
      <button @click="resetAll">Reset Data</button>
    </section>
    
    <p v-if="members.status === 'loading'">Loading members...</p>

    <div v-else-if="members.status === 'error'">
     <p> Couldn't load members ({{ members.error }}). </p>
     <button @click="members.load()">Retry</button>
    </div>

    <p v-else-if="members.isEmpty">No members yet,</p>

    <ul v-else>
      <li v-for="m in members.items" :key="m.id">
        {{ m.position }}. {{ m.name }} ({{ m.phone }})
      </li>
    </ul>  

    <form v-if="members.status ==='ready'" @submit.prevent="submit">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.phone" placeholder="Phone" required />
      <button type="submit" :disabled="members.adding">
        {{ members.adding ? 'Adding...' : 'Add member' }}
      </button>
      <p v-if="members.addError">Couldn't add member ({{ members.addError }}).</p>
    </form>

  </main>
</template>
