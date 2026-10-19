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

<<<<<<< HEAD
export class DataError extends Error {
  readonly code: 'NETWORK' | 'VALIDATION' | 'NOT_FOUND'
  constructor(code:code, message:string) {
    super(message)
    this.code = code
  }
=======
export type DataErrorCode = 'NETWORK' | 'VALIDATION' | 'NOT_FOUND'

export class DataError extends Error {
  readonly code: DataErrorCode
  constructor(code:DataErrorCode, message:string) {
    super(message)
    this.name = 'DataError'
    this.code = code
  }
}

>>>>>>> 5b12dc1 (feat: add data API contract and DataError)
