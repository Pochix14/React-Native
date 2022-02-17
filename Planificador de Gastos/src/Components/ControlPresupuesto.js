import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlPresupuesto = ({presupuesto, gastos, resetApp}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    // Reduce busca en el arreglo la llave especifica y realiza lo que se quiera o establezca en el arrow
    // function, en este caso es ir sumando las cantidades del arreglo y guardarlas en total, que se inicializa en 0
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );
    setGastado(totalGastado);

    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);

    // Se calcula el porncetaje para actualizar el circulo
    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    // Set timeout para que dure 1 seg en cambiar el state y animar
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 800);
  }, [gastos]);
  // Si se le pasa un [], solo se ejecuta 1 vez, si se le pasa una dependecia, se ejecuta cada vez que esta cambia

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          duration={1000}
          value={porcentaje}
          radius={120}
          valueSuffix={'%'}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 22}}
          titleColor="#64748B"
        />
      </View>

      <View style={styles.contenedorTexto}>
        <Pressable style={styles.boton} onPress={resetApp}>
          <Text style={styles.txtBoton}>Reiniciar App</Text>
        </Pressable>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  boton: {
    backgroundColor: '#DB2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 10,
  },
  txtBoton: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ControlPresupuesto;
