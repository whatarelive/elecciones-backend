import { v2 as cloudinary } from 'cloudinary'
import { uploadProps, updateProps, deleteProps } from '../interfaces/interfaces'

/**
 * Modulo para manejar el trabajo con imagenes con el servicio de Cloudinary. 
**/

// Función para subir una nueva imagen a Cloudinary. 
export const uploadImage = async({ image }: uploadProps) => {
    let result
    
    // Si existe la imagen se guarda en Cloudinary
    if (image) {
        result = await cloudinary.uploader.upload(image?.path)  
        
        cloudinary.url( result.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
    } 

    // Dependiendo de la existencia de la imagen, se usan las propiedades de {result} o del {process.env}
    const image_path = image ? result?.secure_url : process.env.DEFAULT_IMAGE_URL
    const image_publicId = image ? result?.public_id : process.env.DEFAULT_IMAGE_PUBLIC_ID

    return {
        image_path: image_path!,
        image_publicId: image_publicId!
    }
}

// Función para remplazar una nueva imagen en Cloudinary. 
export const updateImage = async({ image, model }: updateProps) => {
    // Si existe una imagen en la request.
    // Primero eliminamos la imagen guardada en Cloudinary. 
    if ( image ) { 
        await deleteImage({ 
            publicId: model.image_publicId, 
            imagePath: model.image_path 
        })
    }
    
    // luego subimos la nueva imagen a Cloudinary. 
    return image 
        ? await uploadImage({ image })
        : {
            image_path: model.image_path,
            image_publicId: model.image_publicId
        }
}

// Función para eliminar una nueva imagen en Cloudinary.
export const deleteImage = async({ publicId, imagePath }: deleteProps) => {
    // Si su path es distinto al de la imagen base.
    if ( imagePath !== process.env.DEFAULT_IMAGE_URL ) {
        // Eliminamos la imagen guardada en Cloudinary.
        await cloudinary.uploader.destroy(publicId)
    }
}