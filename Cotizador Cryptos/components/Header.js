import React from 'react'
import {
  Text,
  StyleSheet,
  Platform
} from 'react-native'


const Header = () => (
  <Text style={styles.encabezado}>Criptomonedas</Text>
);

const styles = StyleSheet.create({
  encabezado: {
    // Segun la plataforma asigna el padding, ios 50 o android 10
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    // Para asignar fuente, en caso de error ejecutar en terminal:
    // npx react-native link, esto para enlazar
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 30,
  }
})

export default Header