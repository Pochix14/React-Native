import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Inicios from './Views/Inicios';
import Nosotros from './Views/Nosotros';

// Se crea el stack afuera del App
const Stack = createNativeStackNavigator();


const App = () => {  
  

  return (
    <>
      <NavigationContainer //Es el contenedor de TODO lo que se va a navegar   
      > 
        <Stack.Navigator //Es el stack donde van a ir las pantallas
          initialRouteName='Inicio'
          screenOptions={{ //Screen options se puede utilizar para aplicar las opciones de estilos a todas las pantallas del stack.Navigator
            headerStyle: {
              backgroundColor: '#F4511E'
            },
            headerTintColor: '#FFF',
            headerTitleAlign: 'center'
          }}
        > 
          <Stack.Screen //Se usa para agregar cada pantalla, cada componenete tiene que tener un stack.screen
            name='Inicio'
            component={Inicios}
            options={{ //Permite crear el titulo de la pantalla
              title: 'Home' //Puede ser estatico
            }}
          />
          <Stack.Screen //Se usa para agregar cada pantalla
            name='Nosotros'
            component={Nosotros}
            options={ ({route}) => ({ //Puede crear un titulo dinamico de acuerdo a lo que se quiera
              title: (route.params.totalPagar).toString(), //Se debe convertir a string para que no de error
              headerStyle: { //Para dar estilos a la barra de arriba
                backgroundColor: '#CA2FF0'
              },
              headerTintColor: '#FFF', //Para estilos al color del texto
              headerTitleStyle: 'bold', //Tipo de letra
              headerTitleAlign: 'center', //Align del texto
            }) }
          />
        </Stack.Navigator>
      </NavigationContainer>      
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

