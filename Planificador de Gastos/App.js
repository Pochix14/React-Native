import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './src/Components/Header';
import NuevoPresupuesto from './src/Components/NuevoPresupuesto';
import ControlPresupuesto from './src/Components/ControlPresupuesto';
import FormularioGasto from './src/Components/FormularioGasto';
import {generarID} from './src/helpers';
import ListadoGastos from './src/Components/ListadoGastos';
import Filtro from './src/Components/Filtro';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  // Use effect que busca en memoria si se guardo algun presupuesto y si este es valido, carga el modal
  useEffect(() => {
    const obtenerPresupuesto = async () => {
      try {
        // Funcion que pregunta si existe en memoria el item, en caso de NO, asigna 0
        const presupuestoGuardado =
          (await AsyncStorage.getItem('planificador_presupuesto')) ?? 0;

        // Condicional que valida si el presupuesto es valido para mostrar el modal con el presupuesto guardado
        if (presupuestoGuardado > 0) {
          setPresupuesto(presupuestoGuardado);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuesto();
  }, []);

  // UseEffect que busca en memoria si se guardaron los gastos, en caso contrario asigna arreglo vacio
  useEffect(() => {
    const obtenerGastos = async () => {
      try {
        const gastosGuardados = await AsyncStorage.getItem(
          'planificador_gastos',
        );

        setGastos(gastosGuardados ? JSON.parse(gastosGuardados) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastos();
  }, []);

  // UseEffect para guardar el presupuesto en memoria, con el uso de un async await
  // Este se activa si hay presupuesto valido y cada vez que cambie este
  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuesto = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuesto();
    }
  }, [isValidPresupuesto]);

  // Useeffect que guarda los gastos en memoria
  useEffect(() => {
    const guardargastos = async () => {
      try {
        await AsyncStorage.setItem(
          'planificador_gastos',
          JSON.stringify(gastos), // Se utiliza JSON.stringify para convertir a string ya que solo asi se guardan datos
        );
      } catch (error) {
        console.log(error);
      }
    };
    guardargastos();
  }, [gastos]);

  // Funciona que validad el presupuesto ingresado, debe ser numero y mayor a 0
  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'Debe ingresar un presupuesto valido', [
        {text: 'Aceptar'},
      ]);
    }
  };

  // Funcion que valida que al crear un nuevo gasto, se llenen los campos
  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Aceptar'},
      ]);
      return;
    }

    // Se verifica si el ID existe
    if (gasto.id) {
      const gastosActualizado = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizado);
    } else {
      // Se genera el ID
      gasto.id = generarID();
      gasto.fecha = Date.now();
      // Se agrega el gasto a la lista ya existente
      setGastos([...gastos, gasto]);
    }

    // Se oculta el modal
    setModal(!modal);
  };

  // Funcion que elimina un gasto del arreglo, muestra un alert
  const eliminarGasto = id => {
    Alert.alert(
      'Desea eliminar el gasto?',
      'Un gasto eliminado no se puede recuperar.',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            );
            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ],
    );
  };

  // Funcion que reinicia la app
  const resetApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esto eliminara los datos almacenados',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Resetear',
          style: 'destructive',
          // Si se presiona en resetear
          onPress: async () => {
            try {
              // Limpia memoria
              await AsyncStorage.clear();
              // Setea los states en el estado inicial, con esto se muestra la primer pantalla
              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetApp={resetApp}
            />
          ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              setFiltro={setFiltro}
              filtro={filtro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            setGasto={setGasto}
            gasto={gasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable onPress={() => setModal(!modal)} style={styles.pressable}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  imagen: {
    width: 60,
    height: 60,
  },
  pressable: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default App;
