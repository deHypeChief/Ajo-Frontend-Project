import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setFailureMode, getFailureMode } from '@/data/client'
import type { FailureMode } from '@/data/client'
import { resetData } from '@/data'


export const useDevStore = defineStore('dev', () => {
  const mode = ref<FailureMode>(getFailureMode())
  
  function setMode(m: FailureMode) {
    setFailureMode(m)
    mode.value = m
  }

  function reset() {
    resetData()
  }

  return { mode, setMode, reset }
})