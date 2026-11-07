<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppModal from '@/components/AppModal.vue'
import { useToast } from '@/composables/useToast'
import { useMembersStore } from '@/stores/member'
import type { StoreError } from '@/stores/member'

const members = useMembersStore()
const toast = useToast()

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
}

// ---- Add member ----
const modalOpen = ref(false)
const name = ref('')
const phone = ref('')
const nameError = ref('')
const phoneError = ref('')

const addErrorMessages: Record<StoreError, string> = {
  NETWORK: "We couldn't save that member. Please try again.",
  VALIDATION: "Please check the member's details and try again.",
  NOT_FOUND: "We couldn't save that member. Please try again.",
  UNKNOWN: 'Something went wrong. Please try again.',
}

function openModal() {
  name.value = ''
  phone.value = ''
  nameError.value = ''
  phoneError.value = ''
  modalOpen.value = true
}

async function submit() {
  nameError.value = name.value.trim() ? '' : "Enter the member's name."
  phoneError.value = /^\d{11}$/.test(phone.value.trim()) ? '' : 'Enter an 11-digit phone number.'
  if (nameError.value || phoneError.value) return

  const saved = await members.add({ name: name.value.trim(), phone: phone.value.trim() })
  if (saved) {
    modalOpen.value = false
    toast.success('Member added.')
  } else {
    // The modal stays open so the person can try again without retyping.
    toast.error(addErrorMessages[members.addError ?? 'UNKNOWN'])
  }
}
</script>

<template>
  <section class="members" aria-labelledby="members-title">
    <div class="members__header">
      <h1 id="members-title" class="members__title">Members</h1>
      <AppButton v-if="members.status === 'ready' && !members.isEmpty" @click="openModal">
        Add member
      </AppButton>
    </div>

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
      <AppButton @click="openModal">Add member</AppButton>
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

    <AppModal v-model="modalOpen" title="Add member">
      <form id="add-member-form" class="add-form" novalidate @submit.prevent="submit">
        <AppInput
          v-model="name"
          label="Member name"
          placeholder="e.g. Chidi Eze"
          :error="nameError"
          required
        />
        <AppInput
          v-model="phone"
          label="Phone number"
          type="tel"
          placeholder="08031234567"
          hint="11 digits, numbers only."
          :error="phoneError"
          required
        />
      </form>
      <template #footer>
        <AppButton variant="secondary" :disabled="members.adding" @click="modalOpen = false">
          Cancel
        </AppButton>
        <AppButton type="submit" form="add-member-form" :loading="members.adding">
          Add member
        </AppButton>
      </template>
    </AppModal>
  </section>
</template>

<style scoped>
.members {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.members__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.members__title {
  font-size: var(--text-xl);
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
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