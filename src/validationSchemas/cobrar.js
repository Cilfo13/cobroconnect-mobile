import * as yup from 'yup'
export const cobrarValidationSchema = yup.object().shape({
    monto: yup.string()
        .transform((value, originalValue) => {
        // Reemplazar la coma (,) por un punto (.)
            return originalValue ? originalValue.replace(',', '.') : value;
        })
        .matches(/^\d+(\.\d{1,2})?$/, 'Ingrese un decimal válido de hasta 2 decimales') // Validar el formato del número
        .required('El precio es obligatorio')
})