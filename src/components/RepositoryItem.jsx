import { Image, Text, View, StyleSheet, Platform, Button} from 'react-native'
import React, { Component } from 'react'
import StyledText from './StyledText'
import RepositoryStats from './RepositoryStats'

const parseThousands = value =>{
    const numericValue = parseFloat(value);
    return numericValue >= 1000 
        ? `${Math.round(numericValue/100)/10}k`
        : numericValue.toFixed(2)
}

const RepositoryItemHeader = (props)=>(
    <View style={{ flexDirection:'row', paddingBottom:2}}>
        <View style={{  paddingRight:10}}>
            <StyledText style={styles.language}>{props.id}</StyledText>
        </View>
        <View style={{ flex: 1 }}>
            <StyledText style={styles.text} fontWeight='bold' >{props.direccion}</StyledText>
            <StyledText color='secondary'>{props.razon_social}</StyledText>
        </View>
        <View>
                <StyledText style={styles.text} align='center' fontWeight='bold'> {parseThousands(props.saldo)}</StyledText>
        </View>
    </View>
)

const RepositoryItem = (props) => {
    return(
        <View key={props.id} style={styles.container}>
            <RepositoryItemHeader {...props}/>
            <RepositoryStats {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingBottom:10,
        paddingTop:5,
        borderRadius: 20,
        overflow: 'hidden'
    },
    strong:{
        fontWeight:'bold',
        color: Platform.select({
            android: '#09f',
            ios: 'red',
            default: 'purple'
        }),
        marginBottom:5
    },
    text:{
        color: '#264653',
        fontSize: 18
    },
    language:{
        padding: 6,
        color: '#fff',
        backgroundColor: Platform.OS==='android' ? '#B2B09B': '#EF3054',
        alignSelf: 'flex-start',
        marginVertical: 4,
        borderRadius: 4,
        overflow: 'hidden',
        fontSize:16,
        fontWeight: '700'
    },
    image:{
        width: 48,
        height:48,
        borderRadius:4
    }
})

export default RepositoryItem