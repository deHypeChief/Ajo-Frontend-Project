import { DataError } from './contract'

export type FailureMode = 'random' | 'always' | 'off'
let mode: FailureMode = 'random'

export function setFailureMode(m: FailureMode) {mode = m}
export function getFailureMode(): FailureMode {return mode }

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
const randomDelay = () => 300 + Math.floor(Math.random() * 601) // 300 to 900 ms

function shouldFail(): boolean {
  if (mode === 'always') return true
  if (mode === 'off') return false
  return Math.random() < 0.1 // 1 in 10
}

export async function simulate<T>(work: () => T) {
  await wait(randomDelay())
  if (shouldFail()) throw new DataError('NETWORK', 'Network error. Please try again.')
  return work()  
}