import { Region } from '../interfaces/interfaces'

interface Props {
  data: string,
  validRegion: Region[]
}

export const isTown = ({ data, validRegion }: Props) => {
  const dataTrim = data.toLowerCase().trim().replace(/\s/g, '')
  
  for (const { towns } of validRegion) {
    if (existsTown(dataTrim, towns)) return true
  }
}

const existsTown = (dataTrim: string | undefined , towns: string[]) => {
  let townTrim: string

  return towns.find(town => {
    townTrim = town.toLowerCase().replace(/\s/g, '')

    return townTrim === dataTrim && townTrim
  }) 
}
