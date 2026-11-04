import { simulate } from './client'
import { read, write, clearAll } from './storage'
import { seedMembers} from './seed'
import { DataError } from './contract'
import type { DataApi, GroupInput, MemberInput, PaymentInput } from './contract'
import type { Group, Member, Payment } from '@/types'


const KEYS = {
  group: 'group',
  members: 'members',
  payments: 'payments',
  seeded: 'seeded'
}

function ensureSeeded() {
  if (read<boolean>(KEYS.seeded, false)) return
  write(KEYS.members, seedMembers)
  write(KEYS.seeded, true)
}
ensureSeeded()

export function getGroup(): Promise<Group | null> {
  return simulate(() => read<Group | null>(KEYS.group, null))
}

export function listMembers(): Promise<Member[]> {
  return simulate(() =>
    read<Member[]>(KEYS.members, []).sort((a, b) => a.position - b.position)
  )
}

export function saveGroup(input: GroupInput): Promise<Group> {
  return simulate(() => {
    if (!input.name.trim()) {
      throw new DataError('VALIDATION', 'Group name is required.')
    }
    if (!Number.isInteger(input.amount) || input.amount <= 0) {
      throw new DataError('VALIDATION', 'Amount must be a positive whole number of kobo.')
    }
    const existing = read<Group | null>(KEYS.group, null)
    const group: Group = { ...input, name: input.name.trim(), id: existing?.id ?? crypto.randomUUID() }
    write(KEYS.group, group)
    return group
  })
}

export function addMember(input: MemberInput): Promise<Member> {
 return simulate(() => {
    if (!input.name.trim()) {
      throw new DataError('VALIDATION', 'Member name is required.')
    }
    const members = read<Member[]>(KEYS.members, [])
    const position = members.reduce((max, m) => Math.max(max, m.position), 0) + 1
    const member: Member = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      phone: input.phone,
      position,
    }
    write(KEYS.members, [...members, member])
    return member
  })
}

export function listPayments(cycle?: number): Promise<Payment[]> {
  return simulate(() => {
    const all = read<Payment[]>(KEYS.payments, [])
    return cycle === undefined ? all : all.filter((p) => p.cycle === cycle)
  })
}

export function recordPayment(input: PaymentInput): Promise<Payment> {
  return simulate(() => {
    if (!Number.isInteger(input.paid) || input.paid <= 0) {
      throw new DataError('VALIDATION', 'Amount must be a positive whole number of kobo.')
    }
    if (!Number.isInteger(input.cycle) || input.cycle < 1) {
      throw new DataError('VALIDATION', 'Cycle must be a whole number of 1 or more.')
    }
    const members = read<Member[]>(KEYS.members, [])
    if (!members.some((m) => m.id === input.memberId)) {
      throw new DataError('NOT_FOUND', 'That member does not exist.')
    }
    const payments = read<Payment[]>(KEYS.payments, [])
    const payment: Payment = {
      id: crypto.randomUUID(),
      cycle: input.cycle,
      memberId: input.memberId,
      paid: input.paid,
      paidAt: new Date().toISOString(),
    }
    write(KEYS.payments, [...payments, payment])
    return payment
  })
}

export function resetData(): void {
  clearAll()
  ensureSeeded()
}

export const api: DataApi = {
  getGroup,
  saveGroup,
  listMembers,
  addMember,
  listPayments,
  recordPayment,
}