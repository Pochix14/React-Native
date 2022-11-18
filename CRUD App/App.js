import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Inicio from './Views/Inicio';
import NuevoCliente from './Views/NuevoCliente';
import DetallesCliente from './Views/DetallesCliente';
import BarraSuperior from './Components/UI/Barra';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

//Definicion del tema
//Se copia el default y se va modificando los campos que asi se quieran
const theme = {
  ...DefaultTheme, //Copia de default theme
  colors: {
    ...DefaultTheme.colors, //Copia de los colores del default theme
    primary: '#1774F2',
    accent: '#0655BF',
  }
}



const App = () => {
 

  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Inicio' //Pagina de inicio
        screenOptions={{ //Para cambiar estilos
          headerStyle: { //Para el header
            backgroundColor: theme.colors.primary, //Cambio color de fondo
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      >
        <Stack.Screen
          name='Home'
          component={Inicio}
          options = {({navigation, route}) => ({ //Se usa options para agregar button a la barra superior
            headerTitleAlign: 'center', //Para centrar el titulo
            //headerLeft: (props) => <BarraSuperior {...props}  //Al componente se envian los props para que tenga acceso a navigation y route
            //                    navigation={navigation}
            //                    route = {route}
            //                  /> //Arrow function con callback del componente
          })}
        />
        <Stack.Screen
          name='NuevoCliente' //El nombre es mejor usarlo sin espacios, para llamados
          component={NuevoCliente}
          options={{ //Con options se puede poner el titulo que se quiera
            title: 'Nuevo Cliente'
          }}
        />
        <Stack.Screen
          name='DetallesCliente'
          component={DetallesCliente}
          options={{
            title: 'Detalles'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    
  );
};

const styles = StyleSheet.create({
  
});

export default App;
