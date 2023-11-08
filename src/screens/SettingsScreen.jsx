import react from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react'
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight
    },
  });


export default function SettingsScreen(){
    const {logout} = useContext(AuthContext)
    return(
        <>
            <View styles={styles.container}>
                <Button  onPress={logout} title='Cerrar Sesion'/>
            </View>
        </>
    )
}