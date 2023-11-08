import { createStackNavigator } from '@react-navigation/stack';
import ReporteScreenModal from '../screens/ReporteScreenModal';
import NavigationTab from './NavigationTab';
import CobrarScreenModal from '../screens/CobrarScreenModal';
import InformeCobranzasScreenModal from '../screens/InformeCobranzasScreenModal';
import TransferenciaScreenModal from '../screens/TransferenciaScreenModal';

const Stack = createStackNavigator();

export default function StackNavCobranzas() {
    return (
        <Stack.Navigator
            headerShown='false'
            toBarShowLabel='false'
        >
        <Stack.Screen 
            name="NavigationTab" 
            component={NavigationTab} 
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="Cobranza" 
            component={CobrarScreenModal} 
            options={{
                presentation: 'modal',
                headerTitle:'Cobro',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen 
            name="Transferencia" 
            component={TransferenciaScreenModal} 
            options={{
                presentation: 'modal',
                headerTitle:'Transferencia',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen 
            name="Reporte" 
            component={ReporteScreenModal} 
            options={{
                presentation: 'modal',
                headerTitle:'Reporte',
            }}
        />
        <Stack.Screen 
            name="InformeCobranzas" 
            component={InformeCobranzasScreenModal} 
            options={{
                presentation: 'modal',
                headerTitle:'Informe de cobranzas',
            }}
        />
        </Stack.Navigator>
    );
}
