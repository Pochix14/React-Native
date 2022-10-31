import React, {useState, useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native'

import { Picker } from "@react-native-picker/picker";
import axios from "axios"; // Se importa con: npm i axios --save --force

const Formulario = ({moneda, setMoneda, crypto, setCrypto, setConsultarAPI}) => {
  
  const [crytos, setCryptos] = useState([])

  useEffect(() => {
    // Para llamado a API, se utiliza AXIOS
    // Se instala con el comando npm i --save axios
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await axios.get(url)
      setCryptos(resultado.data.Data)
    }
    consultarAPI()
  }, [])

  //Funciones de guardado de seleccion en picker
  const obtenerMoneda = (coin) => {
    setMoneda(coin)
  }

  const obtenerCrypto = (coin) => {
    setCrypto(coin)
  }

  const cotizarPrecio = () => {
    // Validacion de campos
    if(moneda.trim() === '' || crypto.trim() === '') {
      mostrarAlerta()
      return
    }

    //Si pasa validacion, se cambia state para consultar API
    setConsultarAPI(true)
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Debe seleccionar la moneda y la criptomoneda',
      [
        {text: 'Aceptar'}
      ]
    )
  }

  return (

      <View>
        <Text style={styles.label}>Moneda</Text>
        <Picker
          selectedValue={moneda}
          onValueChange={(coin) => obtenerMoneda(coin)}
          itemStyle={{height: 120}}
        >
          <Picker.Item label="- Seleccione -" value="" />
          <Picker.Item label="USA Dolar" value="USD" />
          <Picker.Item label="Euro" value="EUR" />
          <Picker.Item label="Libra Esterlina" value="GBP" />
          <Picker.Item label="Colon CRC" value="CRC" />
        </Picker>

        <Text style={styles.label}>Criptomoneda</Text>
        <Picker
          selectedValue={crypto}
          onValueChange={(coin) => obtenerCrypto(coin)}
          itemStyle={{height: 120}}
        >
          <Picker.Item label="- Seleccione -" value="" />
          {crytos.map((coin) => (
            <Picker.Item key={coin.CoinInfo.Id} label={coin.CoinInfo.FullName} value={coin.CoinInfo.Name} />
          ))}
        </Picker>

        <TouchableHighlight
          style={styles.btnCotizar}
          onPress={() => cotizarPrecio()}
        >
          <Text style={styles.txtCotizar}>Cotizar</Text>
        </TouchableHighlight>

      </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20
  },
  txtCotizar: {
    color: '#FFF',
    fontFamily: 'Lato-Black',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default Formulario