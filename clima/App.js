import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Formulario from './components/Formulario';
import Clima from './components/Clima';


const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [bgcolor, setbgcolor] = useState('rgb(71, 149, 212)')

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if(consultar) {
        const appID = '18263fc74a069f70a857840417ab4310';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        //Se valida si no existe la ciudad
        if(resultado.cod === "404") {
          mostrarAlerta()
        } else {
          setResultado(resultado)
          // Pone color de fondo de acuerdo a la temperatura
          const kelvin = 273.15;
          const {main} = resultado
          const actual = main.temp - kelvin

          if (actual < 10) {
            setbgcolor('rgb(105, 108, 149)')
          } else if (actual >= 10 && actual <25) {
            setbgcolor('rgb(71, 149, 212)')
          } else {
            setbgcolor('rgb(178, 28, 61)')
          }
        }        
      }
    }
    consultarClima()
    setConsultar(false)
  }, [consultar])

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados para esa ciudad!',
      [{text: 'Aceptar'}]
    )
  }

  const ocultarTeclado = () => {
    // Se usa para quitar el teclado
    Keyboard.dismiss();
  }
  
  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <>
    <TouchableWithoutFeedback
      onPress={() => ocultarTeclado()}
    >
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima 
            resultado={resultado}
          />
          <Formulario 
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View> 
    </TouchableWithoutFeedback>           
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%',

  }
});

export default App;
