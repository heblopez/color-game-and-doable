export interface Credentials {
  email: string
  password: string
}

type tokenRes = {
  token: string
}

type errorRes = {
  errors: string[]
}

export type AuthResponse = tokenRes | errorRes
