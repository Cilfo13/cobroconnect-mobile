import { Platform } from "react-native"

const theme = {
    appBar:{
        primary: '#24292e',
        textPrimary: '#fff',
        textSecondary:'#999'
    },
    colors:{
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6'
    },
    fontSizes:{
        body: 16,
        subheading:18
    },
    fonts: {
        main: Platform.select({
            android:'System',
            ios:'System',
            default:'System'
        })
    },
    fontWeights:{
        normal: '400',
        bold: '700'
    }
}

export default theme