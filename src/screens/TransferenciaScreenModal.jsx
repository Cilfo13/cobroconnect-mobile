import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useLayoutEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Formik, useField } from 'formik'
import FormikInputValue from '../components/FormikInputValue'
import { cobrarValidationSchema } from '../validationSchemas/cobrar'
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import cobrarPOST from '../network/cobrarPOST'
import { AuthContext } from '../context/AuthContext'

const styles = StyleSheet.create({
    clienteText:{
        fontSize:28
    },
    subheadingsText:{
        fontSize:20
    },
    form:{
        display:'flex',
        paddingTop: 20,
        borderColor:'red'
    },
    input:{
        width: 'auto',
        height: 50,
        fontSize: 20,
        marginBottom:30
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        height: 50,
        marginTop:20
      },
      text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})

const initialValues = {
    monto:'',
}

const cobrar = (id, monto, fecha, userToken, navigate, clientes, setClientes, setIsLoading) =>{
    //console.log(id, monto, fecha)
    setIsLoading(true)
    cobrarPOST(id, monto, fecha, userToken, navigate, clientes, setClientes)
}

const TransferenciaScreenModal = (props) => {
    const {userToken, clientes, setClientes} = useContext(AuthContext)
    const {navigate} = useNavigation()
    //Recuperar los datos de las props
    const navigation = useNavigation()
    const { direccion, id, saldo } = props.route.params
    //
    //Cambiar el texto de arriba del modal
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: `Cobrar a cliente ${id}`,
            headerTitleAlign: 'center'
        })
    },[])
    //
    //Controlar los formularios
    const [date, setDate] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
            console.log(params.date)
        },
        [setOpen, setDate]
    );
    //
    const [isLoading, setIsLoading] = useState(false);
    if(isLoading){
        return(
            <View style={{
                marginTop: '50',
                flex:1, 
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text>Cobrando al cliente...</Text>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.clienteText} >Cliente: {id}</Text>
        <Text style={styles.subheadingsText}>Direccion: {direccion}</Text>
        <Text style={styles.subheadingsText}>Saldo Actual: ${saldo}</Text>

        <Formik validationSchema={cobrarValidationSchema} initialValues={initialValues} 
            onSubmit={values=>
                {
                    cobrar(id, values.monto, date, userToken, navigate, clientes, setClientes, setIsLoading)
                }
            }
                >
                {({ handleSubmit})=>{
                    return <View style={styles.form}>
                        <FormikInputValue 
                            placeholder='Monto' 
                            nameField='monto'
                            inputMode='decimal'
                            style={styles.input}
                        />

                        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                            Seleccione una fecha si desea
                        </Button>
                        <DatePickerModal
                            locale="es"
                            mode="single"
                            visible={open}
                            onDismiss={onDismissSingle}
                            date={date}
                            onConfirm={onConfirmSingle}
                        />
                        {date !== null && date !== undefined && (
                            <Text style={{marginBottom:20, fontSize:20}}>Fecha guardada: {date.toLocaleDateString()} </Text>
                        )}
                        <Text style={{marginBottom:20, fontSize:15}}>(Si no selecciona una fecha, se usara la fecha de hoy)</Text>
                        <Pressable
                            style={({pressed}) => [
                                {
                                    backgroundColor: pressed ? '#B2B09B' : '#264653',
                                },
                                styles.button,
                            ]}
                            onPress={handleSubmit}
                            >
                            <Text style={styles.text}>Cobrar</Text>
                        </Pressable>
                    </View>
                }}
        </Formik>
      </View>
    );
}

export default TransferenciaScreenModal