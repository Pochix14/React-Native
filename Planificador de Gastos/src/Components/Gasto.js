import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import globalStyles from '../styles';
import {formatearCantidad, formatoFecha} from '../helpers';

const diccionarioIconos = {
  ahorro: require('../img/icono_ahorro.png'),
  comida: require('../img/icono_comida.png'),
  casa: require('../img/icono_casa.png'),
  varios: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

const Gasto = ({gasto, setModal, setGasto}) => {
  const handleAcciones = () => {
    setModal(true);
    setGasto(gasto);
  };

  return (
    <Pressable onPress={handleAcciones}>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <View style={styles.contenedorImagen}>
            <Image
              style={styles.imagen}
              source={diccionarioIconos[gasto.categoria]}
            />
            <View style={styles.contenedorText}>
              <Text style={styles.categoria}>{gasto.categoria}</Text>
              <Text style={styles.nombreGasto}>{gasto.nombre}</Text>
              <Text style={styles.fecha}>{formatoFecha(gasto.fecha)}</Text>
            </View>
          </View>
          <Text style={styles.cantidad}>
            {formatearCantidad(gasto.cantidad)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 15,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenedorImagen: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contenedorText: {
    flex: 1,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  categoria: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombreGasto: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fecha: {
    fontWeight: 'bold',
    color: '#DB2777',
  },
});

export default Gasto;
