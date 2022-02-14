import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';

import Formulario from './src/Componentes/Formulario';
import Paciente from './src/Componentes/Paciente';
import InfoPaciente from './src/Componentes/infoPaciente';

const App = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = (id) => {
    // Se crea variable del paciente y se obtiene el paciente especifico filtrando por el id del mismo
    const pacienteEditar = pacientes.filter( (paciente) => paciente.id === id)
    // Cuando se encuentra el paciente correcto, se cambia el state que contiene a este
    // Como filter retorna un arreglo, se especifica que es la posicion 0 del arreglo ya que es solo un elemento
    setPaciente(pacienteEditar[0])
  }

  const pacienteEliminar = (id) => {
    Alert.alert(
      'Desea eliminar el paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter((pacientesState) => pacientesState.id !== id)
          setPacientes(pacientesActualizados)
        }}
      ]
    )
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable onPress={() => setModalVisible(true)} style={styles.btnNC}>
        <Text style={styles.btnTxt}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aun</Text> : 
        <FlatList style={styles.lista}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item} 
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar} 
                pacienteEliminar={pacienteEliminar}
                setModalPaciente = {setModalPaciente}
                setPaciente = {setPaciente}
              />
            )}}
        />

      }
      
      {// Con esto se oculta el formulario para que no este activo siempre
      }
      {modalVisible && (
       <Formulario 
        modalVisible = {modalVisible}
        setModalVisible = {setModalVisible}
        pacientes = {pacientes}
        setPacientes = {setPacientes}
        paciente = {paciente}
        setPaciente = {setPaciente}
       />
      )}

      <Modal visible={modalPaciente} animationType='fade'>
        <InfoPaciente paciente = {paciente} setModalPaciente={setModalPaciente} setPaciente={setPaciente} />
      </Modal>
    </SafeAreaView>
  );
};


// Para dar estilos CSS
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1 //Para que tome todo el alto
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9'
  },
  btnNC: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTxt: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  lista: {
    marginTop: 40,
    marginHorizontal: 30
  }
})

export default App;
