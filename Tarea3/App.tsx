import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeScreen from './src/Components/Screens/HomeScreen';

import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import * as reducers from './src/store/reducers';
import thunk from 'redux-thunk';
import {AlbumsProvider} from './src/Context/albums-context';
import {PhotosProvider} from './src/Context/photos-context';
import BottomTabNav from './src/navigators/BottomTabNav';
import {PostsProvider} from './src/Context/posts-context';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(compose(thunk)),
);

const App = () => {
  return (
    <Provider store={store}>
      <PhotosProvider>
        <AlbumsProvider>
          <PostsProvider>
            <BottomTabNav />
          </PostsProvider>
        </AlbumsProvider>
      </PhotosProvider>
    </Provider>
  );
};

export default App;
