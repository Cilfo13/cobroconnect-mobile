import { StyleSheet, View } from 'react-native'
import StyleTextInput from './StyledTextInput'
import StyledText from './StyledText'
import React from 'react'
import { useField } from 'formik'

const styles = StyleSheet.create({
    error:{
        color: 'red',
        fontSize:12,
        marginBottom:20,
        marginTop:-5,
        flexWrap: 'wrap'
    }
})


const FormikInputValue = ({ nameField, ...props}) => {
    const [field, meta, helpers] = useField(nameField)
    return(
        <View style={{display:'flex'}}>
            <StyleTextInput
                        error = {meta.error}
                        value={field.value}
                        onChangeText={ value => helpers.setValue(value)}
                        {...props}
                    />
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </View>
    )
}

export default FormikInputValue