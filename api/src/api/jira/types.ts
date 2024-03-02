export interface TicketData {
  key: string
  summary: string
}

export interface UserData {
  accountId: string
  password?: string
  emailAddress: string
  displayName: string
  locale: string
}
