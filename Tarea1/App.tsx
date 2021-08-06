 import axios from 'axios';
 import React from 'react';
 import {
   SafeAreaView
 } from 'react-native';
import AlbumList from './src/Components/Organisms/AlbumList';


import HomeScreen from './src/Components/Screens/HomeScreen';



 const App = () => {
    // Funcion que realiza el fetch al API
    const fetchAlbums = async () => {
      try {
        const resultado = await axios.get ('https://jsonplaceholder.typicode.com/albums',);
        console.log(resultado);
      } catch (error) {
        console.error(error);
      }
    };
   
   return (
     <SafeAreaView>
       <HomeScreen />
     </SafeAreaView>
   );
 };

 export default App;
