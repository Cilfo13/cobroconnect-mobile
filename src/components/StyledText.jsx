import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
    text:{
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    bold:{
        fontWeight: theme.fontWeights.bold
    },
    colorPrimary:{
        color: theme.colors.primary
    },
    colorSecondary:{
        color: theme.colors.textSecondary
    },
    subheading:{
        fontSize: theme.fontSizes.subheading
    },
    textAlignCenter:{
        textAlign: 'center'
    }
})

export default function StyledText({align, children, color , fontSize, fontWeight, style, ...restOfProps}){
    const textStyles = [
        styles.text,
        color == 'primary' && styles.colorPrimary,
        color == 'secondary' && styles.colorSecondary,
        fontSize == 'subheading' && styles.subheading,
        fontWeight == 'bold' && styles.bold,
        align == 'center' && styles.textAlignCenter,
        style
    ]
    return(
        <Text style={textStyles} {...restOfProps}>
            {children}
        </Text>
    )
}