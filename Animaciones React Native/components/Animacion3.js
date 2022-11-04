import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  Animated,
  View
} from 'react-native'

const Animacion3 = () => {

  //States para guardar valor de la animacion, solo necesita 1 variable
  const [animacion] = useState(new Animated.Value(14)) // Valor inicial

  useEffect(() => {
    // Se llama la animacion, con timing realiza la animacion en ese tiempo establecido
    Animated.timing(
      // lleva el state y un objeto de configuracion
      animacion, {
        toValue: 40, //el valor hacia el que va
        duration: 500, //la duracion en llegar
        useNativeDriver: false //Se pone para que no marque el warning
      }
    ).start() //Siempre debe llevar el start, si no, no inicia
  }, [])

  return (
    <View>
      <Animated.Text 
        style={[styles.texto, {fontSize: animacion}]}
      >
        Animacion3
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center'
  }
})

export default Animacion3