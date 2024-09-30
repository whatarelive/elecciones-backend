type Role = 'Admin' | 'User'

export interface Region {
  province: string,
  towns: string[],
}

interface BasicInfo {
  name: string,
  age: number,
  town: string,
  image_path: string,
  image_publicId: string,
}

export interface Elecciones {
  elecciones: string,
  finalDate: string,
  cantVotes: number,
}

export interface Deputy extends BasicInfo, Pick<Region, 'province'> {
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

export interface uploadProps {
  image: Express.Multer.File | undefined,
}

export interface deleteProps {
  publicId: string,
  imagePath: string,
}

export interface updateProps extends uploadProps {
  model: Deputy | Voter,
}