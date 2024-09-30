// Objeto con las propiedades comunes entre los modelos actuales.
export const basicParams = {
    name: {
        required: true,
        type: String
    },
    age: {    
        required: true,
        type: Number
    },
    image_path: {
        required: true,
        type: String
    },
    image_publicId: {
        required: true,
        type: String
    },
    province: {
        required: true,
        type: String
    },
    town: {
        required: true,
        type: String
    }, 
}