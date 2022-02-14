import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Gasto from './Gasto';

const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {
        // Ternaria que evalua si hay filtro para renderizar por elementos filtrados o si
        // no hay filtro para cargar todos los elementos de la lista
      }
      {filtro
        ? gastosFiltrados.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
        : gastos.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))}

      {
        // Ternaria que evalua si no existen gastos o si no hay gastos para esa categoria
        // y tiene el filtro, para mostrar mensaje de no hay gastos
      }
      {gastos.length === 0 ||
        (gastosFiltrados.length === 0 && !!filtro && (
          <Text style={styles.noGastos}>No hay gastos</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
