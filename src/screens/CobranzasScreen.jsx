import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import RepositoryItem from '../components/RepositoryItem'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import Constants from 'expo-constants';
import { StatusBar } from 'react-native';
import filter from 'lodash.filter';

const CobranzasScreen = (props)=>{
    const {navigate} = useNavigation()
    const {userInfo, userToken, clientes, setClientes} = useContext(AuthContext)
    const [isLoadingClientes, setIsLoadingClientes] = useState(false)
    const [clientesActuales, setClientesActuales] = useState(clientes)

    //Search Bar
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = (query) =>{
        //console.log(query)
        setSearchQuery(query)
        const formattedQuery = query.toUpperCase()
        const filteredData = filter(clientesActuales, (cliente)=>{
            return contains(cliente, formattedQuery)
        })
        setClientes(filteredData)
    }
    const contains = (cliente, query)=>{
        //console.log(cliente)
      
        if(cliente.id.toString().toUpperCase().includes(query) || cliente.direccion.toUpperCase().includes(query)){
            return true;
        }else{
            return false
        }
        return false
    }
    //
    useEffect(()=>{
        setIsLoadingClientes(true)
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        axios.get(`${BASE_URL}/misclientes`, config)
            .then(response => {
                setClientes(response.data)
                setClientesActuales(response.data)
                console.log('Se han traido los clientes')
                //IMPORTANTE
                //Descomentar en produccion
                refreshToken()
                //
                setIsLoadingClientes(false)
            })
            .catch(error => {
                console.error('Error:', error)
                setIsLoadingClientes(false)
            });
    },[])

    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 5,
            elevation: 3,
            marginHorizontal:20
          },
          text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
          },
          searchBox :{
            paddingHorizontal:20,
            paddingVertical:10,
            borderColor: 'black',
            borderWidth:1,
            borderRadius:8,
            marginVertical:10,
            marginHorizontal:20
          }
      });

    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Text style={{
            fontSize: 20,
            marginVertical: 10,
            marginLeft: 15,
            fontWeight: 'bold',
            color:'#264653',
            marginTop: Constants.statusBarHeight
        }}>Bienvenido {userInfo.name}</Text>
            <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#B2B09B' : '#43AA8B',
                        },
                        styles.button,
                    ]}
                    onPress={()=>{navigate('InformeCobranzas')}}
                >
                    <Text style={styles.text}>Generar informe de Cobranzas</Text>
            </Pressable>
            {isLoadingClientes &&
                <View style={{
                        flex:1, 
                        justifyContente:'center',
                        alignItems:'center'
                    }}>
                        <Text>Cargando Clientes...</Text>
                        <ActivityIndicator size={'large'}/>
                </View>
            }
            <SafeAreaView style={styles.container}>
                    <TextInput 
                        placeholder='Buscar' 
                        clearButtonMode='always' //Only in IOS
                        style={styles.searchBox}
                        autoCapitalize='none'
                        value={searchQuery}
                        onChangeText={(query)=>{
                            handleSearch(query)
                            //console.log(query)
                        }}
                    />
                    <FlatList 
                        data={clientes}
                        ItemSeparatorComponent={() => <Text></Text>}
                        renderItem={ ({ item:repo }) => (
                            <RepositoryItem {...repo} />
                        )}
                    >
                    </FlatList>
            </SafeAreaView>

                
            </>
    )
}

export default CobranzasScreen