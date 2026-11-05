import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/data'
import { DataError } from '@/data/contract'
import type { DataErrorCode, MemberInput } from '@/data/contract'
import type { Member } from '@/types'

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'
export type StoreError =  DataErrorCode |'UNKNOWN'


function toCode(e: unknown): StoreError {
  return e instanceof DataError ? e.code : 'UNKNOWN'
}

export const useMembersStore = defineStore('members', () => {
  const items = ref<Member[]>([])
  const status = ref<LoadStatus>('idle')
  const error = ref<StoreError | null>(null)
  const adding = ref(false)
  const addError = ref<StoreError | null>(null)

  const isEmpty =computed(() => status.value === 'ready' && items.value.length === 0)

  async function load(): Promise<void> {
    status.value = 'loading'
    error.value = null
    try {
      items.value = await api.listMembers()
      status.value = 'ready'
    } catch (e) {
      error.value = toCode(e)
      status.value = 'error'
    }
  }
  async function add(input: MemberInput): Promise<boolean> {
    if (adding.value) return false
    adding.value = true
    addError.value = null
    try {
      const member = await api.addMember(input)
      items.value = [...items.value, member]
      return true
    } catch (e) {
      addError.value = toCode(e)
      return false
    } finally {
      adding.value = false
    }
  }

  return { items, status, error, isEmpty, load, adding, addError, add}
})