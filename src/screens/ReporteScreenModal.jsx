import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import {  useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import reportePOST from '../network/reportePOST'
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

const styles = StyleSheet.create({
  clienteText:{
      fontSize:28,
      fontWeight:'700',
      color:'#264653'
  },
  subheadingsText:{
      fontSize:20
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

const generarReporteRapido = (id_cliente, user_token, navigate, range, setIsLoading) =>{
  //console.log('Reporte rapido')
  setIsLoading(true)
  reportePOST(id_cliente, user_token, navigate, range)
  //setIsLoading(false)
}

const ReporteScreenModal = (props) => {
    //Fechas
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
    const onDismiss = React.useCallback(() => {
      setOpen(false);
    }, [setOpen]);
    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
          setOpen(false);
          setRange({ startDate, endDate });
          console.log({ startDate, endDate })
        },
        [setOpen, setRange]
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
                <Text>Generando Reporte</Text>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    const {userToken} = useContext(AuthContext)
    const {navigate} = useNavigation()
    const { direccion, id, saldo } = props.route.params
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.clienteText} >Cliente: {id}</Text>
        <Text style={styles.subheadingsText}>Direccion: {direccion}</Text>
        <Text style={styles.subheadingsText}>Saldo Actual: ${saldo}</Text>
        <Button style={{
          marginTop:15
        }} onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Elegir rango de fechas
        </Button>
        {range.startDate !== null && range.startDate !== undefined && (
            <>
              <Text >Fecha Inicio: {range.startDate.toLocaleDateString()} </Text>
              <Text >Fecha Fin: {range.endDate.toLocaleDateString()} </Text>
            </>
          )
        }
        <Pressable
          style={({pressed}) => [
              {
                  backgroundColor: pressed ? '#2a9d8f' : '#264653',
              },
              styles.button,
          ]}
          onPress={()=>generarReporteRapido(id, userToken, navigate, range, setIsLoading)}
          >
          {range.startDate == undefined ? (
            <Text style={styles.text}>Reporte Rapido</Text>
          ) : (
            <Text style={styles.text}>Generar Reporte</Text>
          )}
        </Pressable>
        <DatePickerModal
          locale="es"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
      </View>
      );
}

export default ReporteScreenModal