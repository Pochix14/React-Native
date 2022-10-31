import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {

  const [moneda, setMoneda] = useState('')
  const [crypto, setCrypto] = useState('')
  const [consultarAPI, setConsultarAPI] = useState(false)
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const cotizarCrypto = async () => {
      if(consultarAPI) {
        //Consultar API para obtener datos de la crypto
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
        const resultado = await axios.get(url)

        setCargando(true)

        setTimeout(() => {
          //Se guarda la respuesta del API
          //Se pone el [cryto][moneda] para que sea dinamico de acuerdo a la crypto y moneda solicitada
          setResultado(resultado.data.DISPLAY[crypto][moneda])

          setConsultarAPI(false)
          setCargando(false)
        }, 2000);        
      }
    }
    cotizarCrypto()
  }, [consultarAPI])

  //Muestra el spinner o resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion  resultado={resultado} />

  return (
    <>
    <ScrollView>
      <Header />

      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />

      <View style={styles.contenido}>
        <Formulario 
          moneda={moneda}
          setMoneda={setMoneda}
          crypto={crypto}
          setCrypto={setCrypto}
          setConsultarAPI={setConsultarAPI}
        />        
      </View>

      <View style={{marginTop: 40}}>
        {componente}
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
