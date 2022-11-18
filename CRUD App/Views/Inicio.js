import React, {useEffect, useState} from 'react'
import {
  FlatList,
  View,
} from 'react-native'
import axios from 'axios'
import { List, Headline, Button, FAB } from 'react-native-paper'

import globalStyles from '../Styles/Global'

const Inicio = ({navigation}) => {

  //State
  const [clientes, setClientes] = useState([])
  const [consultarAPI, setConsultarAPI] = useState(true)

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        //Llamado a API para obtener clientes, se usa async await
        const resultado = await axios.get('http://192.168.1.4:3000/clientes')
        setClientes(resultado.data)
        //Se cambia state a false
        setConsultarAPI(false)
      } catch (error) {
        console.log(error)
      }
    }
    if (consultarAPI) {      
    obtenerClientesApi()
    }
  }, [consultarAPI])

  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon='plus-circle'
        onPress={() => navigation.navigate("NuevoCliente", {setConsultarAPI})} //Con el boton abre pantalla para agregar cliente y pasa la funcion
      >
        Nuevo Cliente
      </Button>
      <Headline
        style={globalStyles.titulo}
      >
        {clientes.length > 0 ? 'Clientes' : 'Aun no hay clientes'}
      </Headline>

      <FlatList //Para crear lista de clientes
        data={clientes} //De donde se obtiene los datos
        keyExtractor={cliente => (cliente.id).toString()} //Identificador
        renderItem={({item}) => ( //Para renderizar, se usa item como prop
          <List.Item //Objeto de paper
            title={item.nombre}
            description={item.empresa}
            //Al presionar en algun elemento de la lista, se pasa a detalles y se pasa el item completo
            onPress={() => navigation.navigate('DetallesCliente', {item, setConsultarAPI})}
          />
        )}
      />

      <FAB //Se usa para crear boton inferior de mas
        icon='plus'
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente", {setConsultarAPI})}
      />
    </View>
  )
}

export default Inicio