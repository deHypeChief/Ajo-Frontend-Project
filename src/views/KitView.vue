<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../components/AppButton.vue'
import AppCard from '../components/AppCard.vue'
import AppInput from '../components/AppInput.vue'
import AppModal from '../components/AppModal.vue'
import AppToast from '../components/AppToast.vue'
import { useToast } from '../composables/useToast'

const toast = useToast()

const emptyValue = ref('')
const filledValue = ref('Ada Obi')
const hintValue = ref('')
const errorValue = ref('abc')
const disabledValue = ref('Locked value')

const modalOpen = ref(false)
const modalName = ref('')
</script>

<template>
  <div class="kit">
    <h1>Component kit</h1>
    <p class="kit__intro">
      Every component in every state. Hover and keyboard focus can't be frozen on screen, so use
      the mouse and the Tab key to see them.
    </p>

    <!-- BUTTON -->
    <section class="kit__section" aria-labelledby="kit-buttons">
      <h2 id="kit-buttons">AppButton</h2>

      <h3>Primary</h3>
      <div class="kit__row">
        <figure class="kit__item">
          <AppButton>Save</AppButton>
          <figcaption>Default</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton disabled>Save</AppButton>
          <figcaption>Disabled</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton loading>Saving…</AppButton>
          <figcaption>Loading</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton size="sm">Save</AppButton>
          <figcaption>Small</figcaption>
        </figure>
      </div>

      <h3>Secondary</h3>
      <div class="kit__row">
        <figure class="kit__item">
          <AppButton variant="secondary">Cancel</AppButton>
          <figcaption>Default</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton variant="secondary" disabled>Cancel</AppButton>
          <figcaption>Disabled</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton variant="secondary" loading>Loading…</AppButton>
          <figcaption>Loading</figcaption>
        </figure>
      </div>

      <h3>Danger</h3>
      <div class="kit__row">
        <figure class="kit__item">
          <AppButton variant="danger">Reset data</AppButton>
          <figcaption>Default</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton variant="danger" disabled>Reset data</AppButton>
          <figcaption>Disabled</figcaption>
        </figure>
        <figure class="kit__item">
          <AppButton variant="danger" loading>Resetting…</AppButton>
          <figcaption>Loading</figcaption>
        </figure>
      </div>
    </section>

    <!-- INPUT -->
    <section class="kit__section" aria-labelledby="kit-inputs">
      <h2 id="kit-inputs">AppInput</h2>
      <div class="kit__grid">
        <figure class="kit__item">
          <AppInput v-model="emptyValue" label="Member name" placeholder="e.g. Ada Obi" />
          <figcaption>Default (empty)</figcaption>
        </figure>
        <figure class="kit__item">
          <AppInput v-model="filledValue" label="Member name" />
          <figcaption>With a value</figcaption>
        </figure>
        <figure class="kit__item">
          <AppInput
            v-model="hintValue"
            label="Phone number"
            type="tel"
            placeholder="0803 123 4567"
            hint="We only use this to contact the member."
            required
          />
          <figcaption>With hint and required</figcaption>
        </figure>
        <figure class="kit__item">
          <AppInput
            v-model="errorValue"
            label="Phone number"
            type="tel"
            error="Enter a phone number with 11 digits."
          />
          <figcaption>Error with message</figcaption>
        </figure>
        <figure class="kit__item">
          <AppInput v-model="disabledValue" label="Group name" disabled />
          <figcaption>Disabled</figcaption>
        </figure>
      </div>
    </section>

    <!-- CARD -->
    <section class="kit__section" aria-labelledby="kit-cards">
      <h2 id="kit-cards">AppCard</h2>
      <div class="kit__grid">
        <figure class="kit__item">
          <AppCard>Friday Savers, ₦20,000 every week.</AppCard>
          <figcaption>Outlined</figcaption>
        </figure>
        <figure class="kit__item">
          <AppCard variant="elevated">Friday Savers, ₦20,000 every week.</AppCard>
          <figcaption>Elevated</figcaption>
        </figure>
        <figure class="kit__item">
          <AppCard>
            <template #header>Cycle 3</template>
            Ada Obi collects this cycle.
            <template #footer>
              <AppButton size="sm">Record payment</AppButton>
              <AppButton size="sm" variant="secondary">View</AppButton>
            </template>
          </AppCard>
          <figcaption>With header and footer</figcaption>
        </figure>
      </div>
    </section>

    <!-- MODAL -->
    <section class="kit__section" aria-labelledby="kit-modal">
      <h2 id="kit-modal">AppModal</h2>
      <div class="kit__row">
        <figure class="kit__item">
          <AppButton @click="modalOpen = true">Open modal</AppButton>
          <figcaption>Closed (press the button to open it)</figcaption>
        </figure>
      </div>

      <AppModal v-model="modalOpen" title="Add member">
        <AppInput v-model="modalName" label="Member name" placeholder="e.g. Chidi Eze" />
        <template #footer>
          <AppButton variant="secondary" @click="modalOpen = false">Cancel</AppButton>
          <AppButton @click="modalOpen = false">Add member</AppButton>
        </template>
      </AppModal>
    </section>

    <!-- TOAST -->
    <section class="kit__section" aria-labelledby="kit-toast">
      <h2 id="kit-toast">AppToast</h2>
      <div class="kit__stack">
        <figure class="kit__item">
          <AppToast variant="success" message="Member added." :dismissible="false" />
          <figcaption>Success</figcaption>
        </figure>
        <figure class="kit__item">
          <AppToast variant="error" message="Couldn't save. Please try again." :dismissible="false" />
          <figcaption>Error</figcaption>
        </figure>
        <figure class="kit__item">
          <AppToast variant="info" message="Your changes are saved on this device." :dismissible="false" />
          <figcaption>Info</figcaption>
        </figure>
        <figure class="kit__item">
          <AppToast variant="info" message="This one can be dismissed." />
          <figcaption>Dismissible</figcaption>
        </figure>
      </div>

      <h3>Live toasts</h3>
      <div class="kit__row">
        <AppButton variant="secondary" @click="toast.success('Member added.')">Show success</AppButton>
        <AppButton variant="secondary" @click="toast.error('Couldn\'t save. Please try again.')">
          Show error
        </AppButton>
        <AppButton variant="secondary" @click="toast.info('Your changes are saved.')">Show info</AppButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.kit {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.kit__intro {
  color: var(--color-text-muted);
}

.kit__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: 2px solid var(--color-border);
}

.kit__section h3 {
  font-size: var(--text-md);
  color: var(--color-text-muted);
}

.kit__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-5);
}

.kit__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-5);
}

.kit__stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
}

.kit__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  margin: 0;
}

.kit__grid .kit__item {
  align-items: stretch;
}

.kit__item figcaption {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
</style>
