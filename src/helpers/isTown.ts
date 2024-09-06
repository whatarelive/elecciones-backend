import { Region } from '../interfaces/interfaces'

interface Props {
  data: string,
  validRegion: Region[]
}

export const isTown = ({ data, validRegion }: Props) => {
  const dataTrim = data.toLowerCase().trim().replace(/\s/g, '')
  let townTrim: string
  let exists: string | undefined

  for (const region of validRegion) {
     exists = region.towns.find(town => {
       townTrim = town.toLowerCase().replace(/\s/g, '')

       return townTrim === dataTrim && townTrim
     })

    if (exists) return true
  }
}
