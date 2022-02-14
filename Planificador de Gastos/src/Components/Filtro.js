import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import globalStyles from '../styles';
import {Picker} from '@react-native-picker/picker';

const Filtro = ({setFiltro, filtro, gastos, setGastosFiltrados}) => {
  useEffect(() => {
    if (filtro === '') {
      setGastosFiltrados([]);
    } else {
      const filtrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(filtrados);
    }
  }, [filtro]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <Picker
        selectedValue={filtro}
        onValueChange={valor => {
          setFiltro(valor);
        }}>
        <Picker.Item label="-- Seleccione --" value="" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Varios" value="varios" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#64748B',
  },
});

export default Filtro;
