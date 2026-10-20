export type kobo = number
export type Frequency = 'week' | 'fortnight' |'month'  // a union of exact string.
export type CycleStatus = 'open' | 'collecting' | 'ready' | 'paid' | 'closed' 

export interface Member {
  id: string
  name: string
  phone: string  
  /** 1-based slot in the payout order. */
  position: number
}

export interface Group {
  id: string
  name: string  
  /** Contribution per member per cycle.*/
  amount: kobo
  startsOn: string
  every: Frequency
  /** ISO date, e.g. '2026-11-01'. */
}

export interface Cycle {
  /** 1-based cycle number.*/
  n: number
  recipientId: string
  status: CycleStatus
}

export interface Payment {
  id: string 
  /** Cycle.n this payment belongs to. */
  cycle: number
  memberId: string
   /** Kobo actually paid. */
  paid: kobo
  /** ISO timestamp. */
  paidAt: string
}

