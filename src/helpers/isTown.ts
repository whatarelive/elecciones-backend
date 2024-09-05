import { Region } from '../interfaces/interfaces'

interface Props {
  data: string,
  validRegion: Region[]
}

export const isTown = ({ data, validRegion }: Props) => {
  for (const region of validRegion) {
    if (region.towns.includes(data)) {
      return true
    }
  }
}
