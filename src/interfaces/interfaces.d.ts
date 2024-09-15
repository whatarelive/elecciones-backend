type Role = 'Admin' | 'User'

export interface Region {
  province: string,
  towns: string[],
}

interface BasicInfo {
  name: string,
  age: number,
  town: string,
}

export interface Deputy extends BasicInfo, Pick<Region, 'province'> {
  image: string,
  position: string,
  biography: string,
  votes?: number,
}

export interface Voter extends BasicInfo, Pick<Region, 'province'> {
  ci: string,
  isValidVoter: boolean
}

export interface Admin extends Pick<BasicInfo, 'name'> {
  password: string,
}

export interface JWTPayload extends Pick<BasicInfo, 'name'> {
  uid: Types.ObjectId,
  role: Role,
}