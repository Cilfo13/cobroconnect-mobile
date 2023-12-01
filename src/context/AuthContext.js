import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect} from "react";
import { BASE_URL } from "../config";
import jwt_decode from "jwt-decode";
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [clientes, setClientes] = useState([])

    const login = (email, password) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/login`,{
            email,
            password
        }).then(res=>{
            try {
                let userInfo = res.data
                let user = userInfo.user
                let userToken = userInfo.authorisation.token
                setUserInfo(user)
                setUserToken(userToken)
                AsyncStorage.setItem('userToken', userToken)
                AsyncStorage.setItem('userInfo', JSON.stringify(user))
                setIsLoading(false)
            } catch (error) {
                console.log('Login Error')
                console.log(e)
                Alert.alert('Error de Login', 'Ocurrio un error con el login, verifique su conexion a internet o si los datos son correctos');
                setIsLoading(false)
            }
        }).catch(e =>{
            console.log('Login Error')
            console.log(e)
            Alert.alert('Error de Login', 'Ocurrio un error en el login, verifique su conexion a internet o si los datos son correctos');
            setIsLoading(false)
        })
    }
    const logout = ()=>{
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.removeItem('userToken')
        console.log('Se cerro sesion')
        setIsLoading(false)
    }

    const refreshToken = async()=>{
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            };
            const response = await axios.post(`${BASE_URL}/refresh`, null, config);
            console.log("Nuevo Token",response.data.authorisation.token)
            const nuevoToken = response.data.authorisation.token;
            await AsyncStorage.removeItem('userToken');
            // Actualizar el estado con el nuevo token
            setUserToken(nuevoToken);
            await AsyncStorage.setItem('userToken', nuevoToken);
            console.log('Token actualizado correctamente')
        } catch (error) {
            console.error('Error al actualizar el token:', error);
        }
    }

    const isLoggedIn = async()=>{
        try{
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            console.log('Token del usuario actual',userToken)
            if(isAccessTokenExpired(userToken)){
                console.log('Token Expirado')
                logout()
                setIsLoading(false)
            }else{
                console.log('Token Valido')
                let userInfo = await AsyncStorage.getItem('userInfo')
                userInfo = JSON.parse(userInfo)
                if(userInfo){
                    setUserInfo(userInfo)
                    setUserToken(userToken)
                }
                setIsLoading(false)
            }
        }catch(e){
            console.log('isLoggedIn Error')
            console.log(e)
        }
    }

    useEffect(()=>{
        isLoggedIn()
    },[])

    return(
        <AuthContext.Provider value={{login, logout, setIsLoading ,isLoading, userToken, userInfo, setUserInfo , clientes, setClientes, refreshToken}}>
            {children}
        </AuthContext.Provider>
    )
}

function isAccessTokenExpired(accessToken) {
    if (!accessToken) {
      return true;
    }
    const tokenData = jwt_decode(accessToken); 
    if (!tokenData || !tokenData.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000); 
    return tokenData.exp < currentTime; 
  }