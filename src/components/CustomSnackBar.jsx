import React from 'react';
import { View, Button } from 'react-native';
import { Snackbar, Provider as PaperProvider } from 'react-native-paper';
const theme = {
    colors: {
      accent: 'green', // Cambia el color de fondo de la Snackbar
      text: 'white',   // Cambia el color del texto de la Snackbar
    },
  };

const CustomSnackbar = () => {
    const [visible, setVisible] = React.useState(false);
  
    const showSnackbar = () => setVisible(true);
  
    const hideSnackbar = () => setVisible(false);
  
    return (
      <PaperProvider theme={theme}>
          <Snackbar
            visible={visible}
            onDismiss={hideSnackbar}
            action={{
              label: 'Cerrar',
              onPress: () => {
                // Agrega acciones personalizadas al botón de cierre si es necesario
                hideSnackbar();
              },
            }}
          >
            Este es un Snackbar personalizado.
          </Snackbar>
      </PaperProvider>
    );
  };
  
  export default CustomSnackbar;