import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

import { formatoFecha } from './helpers';


const Paciente = ({item, setModalVisible, pacienteEditar, pacienteEliminar, setModalPaciente, setPaciente}) => {

  const {paciente, fecha, id} = item


  return (
    <Pressable onPress={() => {
        setModalPaciente(true)
        setPaciente(item)
        }}>
      <View style={styles.contenedor}>
        <Text style={styles.paciente}>Paciente:</Text>
        <Text style={styles.nombre}>{paciente}</Text>
        <Text style={styles.fecha}>{formatoFecha(fecha)}</Text>
      
        <View style={styles.contenedorBtn}>
          <Pressable 
            style={[styles.btn, styles.btnEditar]} 
            onPress={() => {
              setModalVisible(true)
              pacienteEditar(id)
            }}>
              <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onPress={() => {
              pacienteEliminar(id)
            }}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 2,
    borderRadius: 10
  },
  paciente: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  nombre: {
    color: '#6D28D9',
    fontSize: 22,
    fontWeight: '700',
  },
  fecha: {
    color: '#374151',

  },
  contenedorBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  btnEditar: {
    backgroundColor: '#F59E0B'
  },
  btnEliminar: {
    backgroundColor: '#EF4444'
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 14,
    color: '#FFF'
  }
})


export default Paciente;
