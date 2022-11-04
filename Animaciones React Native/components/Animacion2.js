import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  Animated
} from 'react-native'

const Animacion2 = () => {

  //States para guardar valor de la animacion, solo necesita 1 variable
  const [animacion] = useState(new Animated.Value(0)) // Valor inicial

  useEffect(() => {
    // Se llama la animacion, con timing realiza la animacion en ese tiempo establecido
    Animated.timing(
      // lleva el state y un objeto de configuracion
      animacion, {
        toValue: 450, //el valor hacia el que va
        duration: 2000, //la duracion en llegar
        //useNativeDriver: true //Se pone para que no marque el warning
      }
    ).start() //Siempre debe llevar el start, si no, no inicia
  }, [])

  return (
    <Animated.View
      //Se debe poner que se va a animar, en este caso el opacity
      style={[
        styles.caja,
        {
          width: animacion, //ScaleX en lugar de width
          height: animacion //ScaleY en lugar de heigth
        }
      ]}
    >
      
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: 'cornflowerblue'
  }
})

export default Animacion2