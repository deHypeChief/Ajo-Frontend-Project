<script lang="ts">
// Runs once per module, so every input instance gets its own id.
let uid = 0
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label: string
    type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'date'
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    required?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    hint: '',
    error: '',
    disabled: false,
    required: false,
  },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const id = `app-input-${++uid}`
const hintId = `${id}-hint`
const errorId = `${id}-error`

const describedBy = computed(() => {
  if (props.error) return errorId
  if (props.hint) return hintId
  return undefined
})

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="field" :class="{ 'has-error': !!error }">
    <label class="field__label" :for="id">
      {{ label }}
      <span v-if="required" class="field__required" aria-hidden="true">*</span>
    </label>
    <input
      :id="id"
      class="field__input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      @input="onInput"
    />
    <p v-if="error" :id="errorId" class="field__message field__message--error" aria-live="polite">
      <span aria-hidden="true">! </span>{{ error }}
    </p>
    <p v-else-if="hint" :id="hintId" class="field__message">{{ hint }}</p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.field__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
}

.field__required {
  color: var(--color-danger);
}

.field__input {
  min-height: 44px;
  padding: var(--space-2) var(--space-3);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  transition: border-color var(--transition);
}

.field__input::placeholder {
  color: var(--color-text-muted);
}

.field__input:hover:not(:disabled) {
  border-color: var(--color-text-muted);
}

.field__input:focus-visible {
  border-color: var(--color-focus);
}

.field__input:disabled {
  background: var(--color-surface-muted);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.has-error .field__input {
  border-color: var(--color-danger);
}

.field__message {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.field__message--error {
  color: var(--color-danger);
  font-weight: var(--weight-semibold);
}
</style>
