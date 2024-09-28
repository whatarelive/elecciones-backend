import { Region } from '../interfaces/interfaces'

// Parámetros de la función isProvince.
interface Props {
  data: string,
  validRegion: Region[],
}

// Validación custom para comprobar el valor del campo { province } en los Enpoints de Votantes y Diputados.  
export const isProvince = ({ data, validRegion }: Props) => {
  // Transformación de la cadena de texto.
  const dataTrim = data.toLowerCase().trim().replace(/\s/g, '')
  let provinceTrim: string

  // Se va a buscar en el modelo de datos de las provincias, la cadena de texto que se proporciono.
  return validRegion.find((e) => {
    // Transformación de la cadena de texto de la provincia extraída del modelo de datos.
    provinceTrim = e.province.toLowerCase().replace(/\s/g, '')

    // Si ambas coinciden, esta cadena de texto, va a ser una provincia valida. 
    return provinceTrim === dataTrim
  })
}
