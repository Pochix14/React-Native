import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AlbumList from '../Components/Organisms/AlbumList';
import PostsList from '../Components/Organisms/PostsList';
import HomeScreen from '../Components/Screens/HomeScreen';

const BottomTabNav = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Albums" component={HomeScreen} />
        <Screen name="Posts" component={PostsList} />
      </Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNav;
