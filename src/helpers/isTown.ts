import { Region } from '../interfaces/interfaces'

interface Props {
  data: {
    province: string,
    town: string
  }
  validRegion: Region[]
}

export const isTown = ({ data, validRegion }: Props) => {
  let towns: string[] = []

  for (const region of validRegion) {
    if (region.province === data.province) {
      towns = region.towns
    }
  }

  return towns.includes(data.town)
}
