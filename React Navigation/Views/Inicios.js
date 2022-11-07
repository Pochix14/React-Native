import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native'

//Al utilizar navigation, por default envian 2 props al respecto: navigation y route
const Inicios = ({navigation}) => {

  const info = {
    clienteId: 20,
    totalPagar: 500
  }

  const visitarNosotros = () => {
    //Con navigate se puede poner el nombre de la pantalla a la que se quiere ir
    //Navigate tambien permite pasar OBJETOS, estos se ven en el prop ROUTE
    navigation.navigate('Nosotros', info)
  }

  return (
    <View style={styles.contenedor}>
      <Text>Hola</Text>
      <Button
        title='Ir a nosotros'
        onPress={() => visitarNosotros()}
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

export default Inicios