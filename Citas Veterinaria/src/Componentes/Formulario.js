import React, {useState, useEffect} from "react"
import { Modal, Text,SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from "react-native"
import DatePicker from "react-native-date-picker"

const Formulario = ({modalVisible, setModalVisible, setPacientes, pacientes, paciente: pacienteObj, setPaciente: setPacienteObj}) => {

  const [paciente, setPaciente] = useState('')
  const [id, setId] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintomas, setSintomas] = useState('')

  // UseEffect es un callback, queda atento al cambio del componente correspondiente
  useEffect(() => {
    // Si pacienteObj no esta vacio
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
    }
  }, [pacienteObj])


  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert('Datos incompletos', 'Todos los campos son obligatorios', [{text: 'Aceptar'}])

      return
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    }

    // Se revisa si es un nuevo registro o se esta editando
    if (id) {
      nuevoPaciente.id = id
      // Recorre el arreglo de pacientes e identifica el registro que se esta actualizando para crear un arreglo nuevo
      // que contenga el registro actualizado
      const pacientesActualizados = pacientes.map((pacienteState) => 
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPacienteObj({})
    } else {
      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente])
    }


    setModalVisible(!modalVisible)
    setId('')
    setPaciente('')
    setPropietario('')
    setEmail('')
    setTelefono('')
    setFecha(new Date())
    setSintomas('')
  }

  return (
    <Modal animationType='slide' visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable style={styles.btnCancelar} onPress={() => {
              setModalVisible(!modalVisible)
              setPacienteObj({})
              setId('')
              setPaciente('')
              setPropietario('')
              setEmail('')
              setTelefono('')
              setFecha(new Date())
              setSintomas('')
              }}>
            <Text style={styles.cancelarTxt}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              maxLength={8}
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fecha}>
            <DatePicker date={fecha} locale="es" onDateChange={(date) => setFecha(date)} mode='date' />

            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={styles.input}
              placeholder="Sintomas paciente"
              placeholderTextColor={'#666'}
              multiline={true}
              numberOfLines={4}
              value={sintomas}
              onChangeText={setSintomas}
            />
          </View>

          <Pressable style={styles.bntCita} onPress={handleCita}>
            <Text style={styles.citaTxt}>{pacienteObj.id ? 'Editar' : 'Agregar'} paciente</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
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
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  fecha: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  btnCancelar: {
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 12,
    marginVertical: 20,
    borderRadius: 15
  },
  cancelarTxt: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  bntCita: {
    marginVertical: 30,
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    marginHorizontal: 30,
    borderRadius: 10
  },
  citaTxt: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 16
  }
})

export default Formulario