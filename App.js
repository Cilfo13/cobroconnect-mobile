import { StatusBar } from 'expo-status-bar';
import AppNav from './src/navigation/AppNav';
import { AuthProvider } from './src/context/AuthContext';
import "react-native-gesture-handler"
import { es, registerTranslation } from 'react-native-paper-dates'
registerTranslation('es', es)

export default function App() {
  return (
        <AuthProvider>
          <AppNav />
        </AuthProvider>
  );
}
