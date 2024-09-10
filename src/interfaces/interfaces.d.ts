type Role = 'Admin' | 'User'

export interface Region {
  province: string,
  towns: string[],
}

export interface Deputy extends Region {
  name: string,
  image: string,
  age: number,
  position: string,
  biography: string,
  votes?: number,
}

export interface JWTPayload {
  uid: string,
  name: string,
  role: Role
}