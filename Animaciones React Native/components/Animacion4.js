import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  Animated,
  View
} from 'react-native'

const Animacion4 = () => {

  //States para guardar valor de la animacion, solo necesita 1 variable
  const [animacion] = useState(new Animated.Value(0)) // Valor inicial

  useEffect(() => {
    // Se llama la animacion, con timing realiza la animacion en ese tiempo establecido
    Animated.timing(
      // lleva el state y un objeto de configuracion
      animacion, {
        toValue: 360, //Valor final, 360 por ser grados
        duration: 500, //la duracion en llegar
        useNativeDriver: false //Se pone para que no marque el warning
      }
    ).start() //Siempre debe llevar el start, si no, no inicia
  }, [])

  //Interpolacion
  const interpolacion = animacion.interpolate({
    inputRange: [0, 360], //Es el rango del giro
    outputRange: ['0deg', '360deg'] //Salida en formato CSS, desde 0 a 360 degres
  })

  //El estilo de la animacion, en este caso es rotacion
  const estiloAnimacion = {
    transform: [{ rotate: interpolacion }]
  }

  return (
    <View>
      <Animated.View 
        style={[styles.texto, estiloAnimacion]}
      >
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    width: 100,
    height: 100,
    backgroundColor: 'cornflowerblue'
  }
})

export default Animacion4