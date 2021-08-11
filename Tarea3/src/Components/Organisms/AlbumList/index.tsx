import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import AlbumListItem from '../../Molecules/AlbumListItem.tsx';
import {useAlbums} from '../../../Context/albums-context';
import {usePhotos} from '../../../Context/photos-context';

const AlbumList: React.FC = () => {
  const {albums, fetchAlbums} = useAlbums();
  const {photos, fetchPhotos} = usePhotos();

  useEffect(() => {
    fetchAlbums();
    fetchPhotos();
  }, []);

  return (
    <View>
      {albums.length > 0 ? (
        <FlatList
          data={albums}
          renderItem={({item}) => (
            <AlbumListItem album={item} photos={photos} />
          )}
        />
      ) : (
        <ActivityIndicator color="#000" />
      )}
    </View>
  );
};

export default AlbumList;
