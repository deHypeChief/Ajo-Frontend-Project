import type { Frequency, Group, Member, Payment } from '@/types'

export type GroupInput = Omit<Group, 'id'>
export type MemberInput = Omit<Member, 'id' | 'position'>
export type PaymentInput = Omit<Payment, 'id' | 'paidAt'>

export interface DataApi {
  getGroup(): Promise<Group | null>
  saveGroup(input: GroupInput): Promise<Group>
  listMembers(): Promise<Member[]>
  addMember(input: MemberInput):Promise<Member>
  listPayments(cycle?: number):Promise<Payment[]>
  recordPayment(input: PaymentInput):Promise<Payment>
}

export class DataError extends Error {
  readonly code: 'NETWORK' | 'VALIDATION' | 'NOT_FOUND'
  constructor(code:code, message:string) {
    super(message)
    this.code = code
  }