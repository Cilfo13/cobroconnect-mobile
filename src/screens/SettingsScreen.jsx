import react from "react";
import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react'
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight
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
    logout:{
        backgroundColor: 'red'
    }
  });

const elegirCarpeta = async ()=>{
    let permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    directoryUri = permissions.directoryUri
    AsyncStorage.setItem('directoryUri', directoryUri)
    console.log('Carpeta elegida')
}

export default function SettingsScreen(){
    const {logout} = useContext(AuthContext)
    return(
        <>
            <View styles={styles.container}>
                <Pressable
                                style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#B2B09B' : '#09F',
                                    },
                                    styles.button,
                                ]}
                                onPress={elegirCarpeta}
                                >
                                <Text style={styles.text}>ELEGIR CARPETA</Text>
                </Pressable>
                <Pressable
                                style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#B2B09B' : 'red',
                                    },
                                    styles.button,
                                ]}
                                onPress={logout}
                                >
                                <Text style={styles.text}>CERRAR SESION</Text>
                </Pressable>
            </View>
        </>
    )
}