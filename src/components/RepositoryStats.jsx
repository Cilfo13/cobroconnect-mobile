import { Image, Text, View, StyleSheet, Button, Pressable} from 'react-native'
import React, { Component } from 'react'
import StyledText from './StyledText'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

const RepositoryStats = props => {
    const {navigate} = useNavigation()
    return(
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:5 }} >
            <View>
                <Pressable 
                    style={({pressed}) => [
                        {
                        backgroundColor: pressed ? '#B2B09B' : '#43AA8B',
                        },
                        styles.button,
                    ]}
                    onPress={()=>{navigate('Reporte', {...props})}}
                >
                    <Text style={styles.text}>Generar reporte</Text>
                </Pressable>
            </View>
            <View>
            <Pressable 
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? '#B2B09B' : '#264653',
                    },
                    styles.button,
                ]}
                onPress={() => navigate('Cobranza', {...props})}
                >
                    <Text style={styles.text}>Cobrar</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default RepositoryStats