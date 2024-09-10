import { Region } from '../interfaces/interfaces'

interface Props {
  data: string,
  validRegion: Region[],
}

export const isProvince = ({ data, validRegion }: Props) => {
  const dataTrim = data.toLowerCase().trim().replace(/\s/g, '')
  let provinceTrim: string

  return validRegion.find((e) => {
    provinceTrim = e.province.toLowerCase().replace(/\s/g, '')

    return provinceTrim === dataTrim
  })
}
