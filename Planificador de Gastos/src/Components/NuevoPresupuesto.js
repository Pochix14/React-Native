import React, {useEffect} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../styles';

const NuevoPresupuesto = ({
  handleNuevoPresupuesto,
  presupuesto,
  setPresupuesto,
}) => {
  useEffect(() => {
    const obtener = async () => {
      const valor = await AsyncStorage.getItem('prueba1');
      console.log(valor);
    };
    obtener();
  }, []);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />

      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto)}>
        <Text style={styles.btnTxt}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  btnTxt: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NuevoPresupuesto;
