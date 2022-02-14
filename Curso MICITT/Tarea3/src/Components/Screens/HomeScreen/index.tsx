import React from 'react';
import {View} from 'react-native';
import {useAlbums} from '../../../Context/albums-context';
import AlbumDetail from '../../Organisms/AlbumDetails';
import AlbumList from '../../Organisms/AlbumList';
import PostsList from '../../Organisms/PostsList';

const HomeScreen: React.FC = () => {
  const {selectedAlbum} = useAlbums();

  return <View>{selectedAlbum ? <AlbumDetail /> : <AlbumList />}</View>;
};

export default HomeScreen;
