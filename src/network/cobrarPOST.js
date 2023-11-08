import axios from "axios";
import { BASE_URL } from "../config";
import { Alert } from 'react-native';

const actualizarSaldoPorId = (id, nuevoSaldo, clientes, setClientes) => {
    const nuevosDatos = clientes.map(item => {
      if (item.id === id) {
        return { ...item, saldo: nuevoSaldo };
      }
      return item;
    });
    setClientes(nuevosDatos);
  };
const cobrarPOST = (id_cliente, monto, fecha, userToken, navigate, clientes, setClientes) =>{
        console.log(clientes)
        console.log(userToken)
        let config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        axios.post(`${BASE_URL}/cobrar`,{
            id_cliente,
            monto,
            fecha
        }, config)
            .then(res=>{
                console.log("CobrarPOST: ",res.data.message)
                actualizarSaldoPorId(id_cliente,res.data.saldo_nuevo, clientes, setClientes)
                navigate('NavigationTab',{
                    screen: 'Cobranzas',
                    params: { mensaje: res.data.message },
                })
                Alert.alert('Éxito', res.data.message);
        })
            .catch(e =>{
                Alert.alert('Error', 'Ocurrio un error al procesar el cobro');
                console.log('Cobrar Error')
                console.log(e)
        })
}

export default cobrarPOST