// Parametros de la función handlerPaginate.
interface Props { 
    page: any,
    limit: any
}

// Funcion auxiliar para extraer la logica del calculo de la paginación. 
export const handlerPaginate = ({ page, limit }: Props) => {
    const pageNumber = parseInt(page as string) || 1 
    const limitNumber= parseInt(limit as string) || 10
    const skip = ( pageNumber - 1 ) * limitNumber

    return {
        skip,
        limitNumber
    }
}