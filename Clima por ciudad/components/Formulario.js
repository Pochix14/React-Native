import React, {useState} from 'react'
import {
  Text, 
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

  const {pais, ciudad} = busqueda

  //Solo se necesita la variable, ya que el set no se ocupa puesto que 
  //el manejo se realiza con el Animated
  const [animacionBtn] = useState(new Animated.Value(1))

  const consultarClima = () => {
    if(pais.trim() === '' || ciudad.trim() === '') {
      mostrarAletar()
      return
    }
    setConsultar(true)
  }

  const mostrarAletar = () => {
    Alert.alert(
      'Error',
      'Debe selecionar una ciudad y un pais',
      [{text: 'Aceptar'}]
    )
  }


  //Funciones para la animacion, se usan en combinacion a los onPress in & out
  //que tiene el touchableWithoutFeedback

  const animacionEntrada = () => {
    // Se utiliza animated, el spring da un toque mas realista, recibe la 
    //animacion y un objeto de configuracion ~en el se definen los cambios~
    //al final debe llamarse el metodo start o no se va a ver la animacion
    Animated.spring(animacionBtn, {
      toValue: .9,
      useNativeDriver: true
    }).start();
  }

  const animacionSalida = () => {
    Animated.spring(animacionBtn, {
      toValue: 1,
      friction: 2, // Que tanto rebote, entre mas bajo, mas rebote
      tension: 30, //Que tan suave se ve el movimiento, entre mas bajo mas suave
      useNativeDriver: true
    }).start();
  }

  // Objeto de referencia a la animacion, es el tipo de animacion que se busca
  const estiloAnimacion = {
    transform: [{scale: animacionBtn}]
  }


  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput 
            value={ciudad}
            style={styles.input}
            onChangeText={(ciudad) => setBusqueda({...busqueda, ciudad})} //Copia lo que habia y le agrega ciudad
            placeholder='Ciudad'
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            itemStyle={{ height: 120, backgroundColor: '#FFF', borderRadius: 8 }}
            onValueChange={(pais) => setBusqueda({...busqueda, pais})} //Copia lo que habia y le agrega pais
          >
            <Picker.Item label='-- Seleccione un pais --' value="" />
            <Picker.Item label='Costa Rica' value="CR" />
            <Picker.Item label='Estados Unidos' value="US" />            
            <Picker.Item label='Argentina' value="AR" />
            <Picker.Item label='Colombia' value="CO" />
            <Picker.Item label='Espana' value="ES" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
          onPress={() => consultarClima()}
        >
          <Animated.View
            style={[styles.btnBuscar, estiloAnimacion]}
          >
            <Text style={styles.txtBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 8
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center'
  },
  txtBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18
  }
})

export default Formulario