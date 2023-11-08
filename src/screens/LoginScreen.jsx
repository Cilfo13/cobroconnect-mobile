import React from 'react'
import { View, Button, StyleSheet, Text} from 'react-native'
import { Formik, useField } from 'formik'
import { loginValidationSchema } from '../validationSchemas/login'
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react'
import FormikInputValue from '../components/FormikInputValue'

const initialValues = {
    email:'',
    password:''
}

const styles = StyleSheet.create({
    form:{
        marginTop:300,
        display:'flex',
        padding:25
    },
    error:{
        color: 'red',
        fontSize:12,
        marginBottom:20,
        marginTop:-5
    }
})

export default function LoginPage() {
    const {login} = useContext(AuthContext)
    return <Formik validationSchema={loginValidationSchema} initialValues={initialValues} 
    onSubmit={values=>
        {
            console.log(values)
            login(values.email, values.password)
        }
    }
        >
        {({ handleSubmit})=>{
            return <View style={styles.form}>
                <Text style={{
                    fontSize:32,
                    fontWeight:'500',
                    marginBottom:10,
                    textAlign:'center'
                }}>Cobroconnect</Text>
                <FormikInputValue 
                    placeholder='Usuario' 
                    nameField='email'
                    autoCapitalize='none'
                />
                <FormikInputValue
                    placeholder='Contraseña' 
                    nameField='password'
                    secureTextEntry
                    autoCapitalize='none'
                />
                <Button onPress={handleSubmit} title='Iniciar Sesion'/>
            </View>
        }}
    </Formik>
};
