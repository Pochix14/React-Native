import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Headline, Text, Button, FAB } from 'react-native-paper'
import axios from 'axios'

import globalStyles from '../Styles/Global'

const DetallesCliente = ({navigation, route}) => {

  const {setConsultarAPI} = route.params;

  const {nombre, telefono, correo, empresa, id} = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert(
      'Desea eliminar el cliente?',
      'Una vez eliminado, no se puede recuperar',
      [
        {text: 'Eliminar', onPress: () => eliminarContacto()},
        {text: 'Cancelar', style: 'cancel'}
      ]
    )
  }

  const eliminarContacto = async () => {
    const url = `http://192.168.1.4:3000/clientes/${id}`
    console.log(url)
    try {
      await axios.delete(url)
    } catch (error) {
      console.log(error)
    }
    //Redireccionar
    navigation.navigate('Home')
    //Reconsultar API
    setConsultarAPI(true)
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline
        style={globalStyles.titulo}
      >
        {nombre}
      </Headline>
      <Text style={styles.texto}>Empresa: {empresa}</Text>
      <Text style={styles.texto}>Correo: {correo}</Text>
      <Text style={styles.texto}>Telefono: {telefono}</Text>

      <Button
        mode="contained"
        icon="cancel"
        style={styles.btnEliminar}
        onPress={() => mostrarConfirmacion()}
      >
        Eliminar Cliente
      </Button>

      <FAB //Se usa para crear boton inferior de mas
        icon='pencil'
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente", {cliente: route.params.item, setConsultarAPI})}
        //Se reutiliza el fab, pero se pasa un cliente que se obtiene del route que llega a este componente
      />

    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18
  },
  btnEliminar: {
    marginTop: 100,
    backgroundColor: 'red'
  }
})

export default DetallesCliente