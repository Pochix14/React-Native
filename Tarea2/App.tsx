import axios from 'axios';
import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './src/Components/Screens/HomeScreen';

import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import * as reducers from './src/store/reducers';
import AlbumReducer from './src/store/reducers/Albums';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(compose(thunk)),
);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
