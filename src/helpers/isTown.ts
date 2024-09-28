import { Region } from '../interfaces/interfaces'

// Parámetros de la función isTown.
interface Props {
  data: string,
  validRegion: Region[]
}

// Validación custom para comprobar el valor del campo { town } en los Enpoints de Votantes y Diputados.  
export const isTown = ({ data, validRegion }: Props) => {
  // Transformación de la cadena de texto.
  const dataTrim = data.toLowerCase().trim().replace(/\s/g, '')
  
  // Se va a buscar en el modelo de datos de las provincias, la cadena de texto que se proporciono 
  for (const { towns } of validRegion) {
    // si existe en los municipios validos.
    if (existsTown(dataTrim, towns)) return true
  }
}

// Función auxiliar para comprobar si la cadena de texto existe en el arreglo de municipios.
const existsTown = (dataTrim: string | undefined , towns: string[]) => {
  let townTrim: string

  // Se va a buscar en el arreglo de municipios, la cadena de texto que se proporciono 
  return towns.find(town => {
    // Transformación de la cadena de texto del valor de la iteración.
    townTrim = town.toLowerCase().replace(/\s/g, '')

    // Si ambas coinciden, esta cadena de texto, va a ser un municipio valido. 
    return townTrim === dataTrim
  }) 
}
