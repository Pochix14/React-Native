import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import axios from 'axios'


import globalStyles from '../Styles/Global'

const NuevoCliente = ({navigation, route}) => {

  //Se extra la funcion del route
  const {setConsultarAPI} = route.params

  //States
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [alerta, setAlerta] = useState(false)

  //Para detectar si es edicion o es nuevo cliente
  useEffect(() => {
    //Si se pasa un cliente, se llenan los campos
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente
      setNombre(nombre)
      setTelefono(telefono)
      setCorreo(correo)
      setEmpresa(empresa)
    }
  }, [])

  const guardarCliente = async () => {
    //Validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      setAlerta(true)
      return
    }
    //Generar cliente
    const cliente = {nombre, telefono, correo, empresa}

    //Valida si se esta creado o editando el cliente
    if (route.params.cliente) {
      //Guarda edicion del cliente
      const {id} = route.params.cliente
      cliente.id = id
      const url = `http://192.168.1.4:3000/clientes/${id}`
      try {
        //PUT para actualizar, se pone el URL y el nuevo objeto para actualizacion
        await axios.put(url, cliente)
      } catch (error) {
        console.log(error)
      }

    } else {
      //Guardar nuevo cliente en API
      try {
        //Android
        await axios.post('http://192.168.1.4:3000/clientes', cliente)
      } catch (error) {
        console.log(error)
      }
    }

    
    //Redireccionar
    navigation.navigate('Home')
    //Limpiar form
    setNombre('')
    setTelefono('')
    setCorreo('')
    setEmpresa('')
    //Cambiar funcion de render a true para actualizar lista con nuevo cliente
    setConsultarAPI(true)
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline
        style={globalStyles.titulo}
      >
        Agregar nuevo cliente
      </Headline>

      <TextInput 
        label="Nombre"
        placeholder='Pablo'
        onChangeText={(texto) => setNombre(texto)} //Pasa automaticamente el texto escrito
        style={styles.input}
        value={nombre}
      />
      <TextInput 
        label="Telefono"
        placeholder='87654321'
        onChangeText={(texto) => setTelefono(texto)}
        style={styles.input}
        value={telefono}
      />
      <TextInput 
        label="Correo"
        placeholder='correo@correo.com'
        onChangeText={(texto) => setCorreo(texto)}
        style={styles.input}
        value={correo}
      />
      <TextInput 
        label="Empresa"
        placeholder='Nombre empresa'
        onChangeText={(texto) => setEmpresa(texto)}
        style={styles.input}
        value={empresa}
      />

      <Button
        icon="pencil-circle"
        mode='contained'
        onPress={() => guardarCliente()}
      >
        Guardar Cliente
      </Button>

      <Portal>
        {/*Dialog se usa para crear ventana de error, tiene title, content (dentro el paragraph) y el action para los botones */}
        <Dialog
          visible={alerta} //Para controlar cuando se muestar
          onDismiss={() => setAlerta(false)} //Para cuando se da click afuera, se cierre el error
        >          
          <Dialog.Title>Error</Dialog.Title> 
          <Dialog.Content>
            <Paragraph>
              Todos los campos son obligatorios.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>Aceptar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
})

export default NuevoCliente