import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {IState} from '../../../Models/IState';
import AlbumDetail from '../../Organisms/AlbumDetails';
import AlbumList from '../../Organisms/AlbumList';

const HomeScreen: React.FC = () => {
  const selectedUser = useSelector(
    (state: IState) => state.Albums.selectedAlbum,
  );

  return <View>{selectedUser ? <AlbumDetail /> : <AlbumList />}</View>;
};

export default HomeScreen;
