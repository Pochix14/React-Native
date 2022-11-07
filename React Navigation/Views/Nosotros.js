import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native'

//Con el prop ROUTE se pueden obtener los parametros que se envian de otra pagina
const Nosotros = ({navigation, route}) => {

  const {clienteId} = route.params

  const volver = () => {
    //GoBack se devuelve a la vista anterior
    navigation.goBack()
  }

  return (
    <View style={styles.contenedor}>
      <Text>Cliente #: {clienteId}</Text>
      <Button
        title='Volver'
        onPress={() => volver()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Nosotros