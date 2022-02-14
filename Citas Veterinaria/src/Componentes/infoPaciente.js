import React from "react"
import { Text, SafeAreaView, View, Pressable, StyleSheet, ScrollView } from "react-native"

import { formatoFecha } from "./helpers"


const InfoPaciente = ({paciente, setModalPaciente, setPaciente}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
    <ScrollView>
      <Text style={styles.titulo}>Informacion {''}<Text style={styles.tituloBold}>Paciente</Text></Text>
      <View>
        <Pressable onPress={() => {setModalPaciente(false); setPaciente({})}} style={styles.btnCerrar}>
          <Text style={styles.cerrarTxt}>Cerrar</Text>
        </Pressable>
      </View>
      
      <View style={styles.contenido}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Propietario</Text>
          <Text style={styles.valor}>{paciente.propietario}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.valor}>{paciente.email}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Telefono</Text>
          <Text style={styles.valor}>{paciente.telefono}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Fecha Alta</Text>
          <Text style={styles.valor}>{formatoFecha(paciente.fecha)}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Sintomas</Text>
          <Text style={styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 12,
    marginVertical: 20,
    borderRadius: 15
  },
  cerrarTxt: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  contenido: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 15,
    // Para crear sombre
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  campo: {
    marginBottom: 10
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '700',
    marginBottom: 3,
    fontSize: 18
  },
  valor: {
    fontWeight: '600',
    fontSize: 20,
    color: '#334155'
  }
})

export default InfoPaciente