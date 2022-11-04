import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  Animated
} from 'react-native'

const Animacion1 = () => {

  //States para guardar valor de la animacion, solo necesita 1 variable
  const [animacion] = useState(new Animated.Value(0)) // Valor inicial

  useEffect(() => {
    // Se llama la animacion, con timing realiza la animacion en ese tiempo establecido
    Animated.timing(
      // lleva el state y un objeto de configuracion
      animacion, {
        toValue: 1, //el valor hacia el que va
        duration: 500, //la duracion en llegar
        useNativeDriver: true //Se pone para que no marque el warning
      }
    ).start() //Siempre debe llevar el start, si no, no inicia
  }, [])

  return (
    <Animated.View
      //Se debe poner que se va a animar, en este caso el opacity
      style={{opacity: animacion}}
    >
      <Text style={styles.texto}>Animacion1</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center'
  }
})

export default Animacion1