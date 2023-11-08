import * as yup from 'yup'
export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('El email es requerido'),
    password: yup
        .string()
        .min(1, 'Contraseña demasiado corta')
        .max(1000, 'Contraseña demasiado grande!')
        .required('La contraseña es requerida')
})