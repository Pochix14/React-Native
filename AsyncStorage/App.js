import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


const App = () => {

  const [inputTexto, setInputTexto] = useState('')
  const [nombreStorage, setNombreStorage] = useState('')

  useEffect(() => {
    obtenerDatosStorage();
  }, [])
  
  // Se hace async porque es requisito de AsyncStorage
  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto) //Es llave-valor
      setNombreStorage(inputTexto)
    } catch (Error) {
      console.log(Error)
    }
  }

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre')
      setNombreStorage(nombre)
    } catch (Error) {
      console.log(Error)
    }
  }

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      setNombreStorage('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={styles.contenedor}>

        {nombreStorage ? 
          (<Text >Hola {nombreStorage}</Text>)
          :
          null
        }        

        <TextInput 
          style={styles.input}
          placeholder='Escribe tu nombre'
          onChangeText={(texto) => setInputTexto(texto)}
        />

        <Button 
          title='Guardar'
          color='#333'
          onPress={() => guardarDatos()}      
        />

        { nombreStorage ?
          (<TouchableHighlight
            style={styles.btnEliminar}
            onPress={() => eliminarDatos()}
          >
            <Text style={styles.txtEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>)
          :
          null
        }
        
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10
  },
  txtEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }
});

export default App;
