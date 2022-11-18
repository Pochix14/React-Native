import React from 'react'
//Solo se puede utilizar un tipo button ya sea de react native o de paper
import {Button} from 'react-native-paper'

const BarraSuperior = ({navigation, route}) => {

  const handlePress = () => {
    navigation.navigate('NuevoCliente')
  }

  return (
    <Button
      onPress={() => handlePress()}
      color='#FFF'
      icon='plus-circle'
    >
      Nuevo Cliente
    </Button>
  )
}

export default BarraSuperior