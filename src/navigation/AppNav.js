//RNFE
import { View, Text, ActivityIndicator} from 'react-native'
import React, {useContext} from 'react'
import StackNavCobranzas from './StackNavCobranzas'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import AuthNav from './AuthNav'

function AppNav () {
    const {isLoading, userToken} = useContext(AuthContext)
    if(isLoading){
        return(
            <View style={{
                marginTop: '50',
                flex:1, 
                justifyContente:'center',
                alignItems:'center'
            }}>
                <Text>Iniciando Sesion</Text>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }
    //console.log(userToken)
    return (
        <NavigationContainer>
            { userToken !== null ?
                <StackNavCobranzas/> :
                <AuthNav/>
            }
        </NavigationContainer>
    )
}

export default AppNav