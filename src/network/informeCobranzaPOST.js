import { BASE_URL } from "../config";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import AsyncStorage from "@react-native-async-storage/async-storage";

const InformeCobranzaPOST =  async ( userToken, navigate, range) =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const filename = `InformeCobranzas_${year}${month}${day}_${hours}${minutes}${seconds}.pdf`;

    let startDate = null
    let endDate = null
    let fechaSeleccionada = false;
    if(range.startDate != undefined){
      startDate = range.startDate
      endDate = range.endDate
      fechaSeleccionada = true
      console.log('Se selecciono un rango de fechas informeCobranzasPOST')
    }
    const result = await FileSystem.downloadAsync(
      `${BASE_URL}/generarInformeCobranzas?startDate=${startDate}&endDate=${endDate}&fechaSeleccionada=${fechaSeleccionada.toString()}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        }
      }
    );
    console.log(result);
    save(result.uri, filename, 'application/pdf', navigate);
};

const showAlert = (uri) =>{
  Alert.alert('Éxito', 'Informe generado exitosamente', [
    {
      text: 'Compartir',
      onPress: () => {
        if(Sharing.isAvailableAsync()){
          Sharing.shareAsync(uri)
          console.log('Archivo Compartido')
        }else{
          console.log('No se puede compartir')
        }
        showAlert(uri);
      },
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
}

const save = async (uri, filename, mimetype, navigate) => {
  if (Platform.OS === "android") {
    let directoryUri = await AsyncStorage.getItem('directoryUri')
    let permisoConcedido = false
    if(!directoryUri){
      let permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      directoryUri = permissions.directoryUri
      AsyncStorage.setItem('directoryUri', directoryUri)
      if(permissions.granted){
        permisoConcedido = true
      }
    }else{
      permisoConcedido = true
    }
    if (permisoConcedido) {
      //Guardar Uri, Dentro el almacenamiento local
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, filename, mimetype)
        .then(async (NewSAFuri) => {
          await FileSystem.writeAsStringAsync(NewSAFuri, base64, { encoding: FileSystem.EncodingType.Base64 });
          console.log('Archivo descargado')
          
          navigate('NavigationTab',{
            screen: 'Cobranzas',
            params: { mensaje: 'Informe Descargado con exito' },
          })
          showAlert(uri);
        })
        .catch(e => {
          console.log(e)
        } );
    } else {
      Sharing.shareAsync(uri);
    }
  } else {
    Sharing.shareAsync(uri);
  }
};
export default InformeCobranzaPOST