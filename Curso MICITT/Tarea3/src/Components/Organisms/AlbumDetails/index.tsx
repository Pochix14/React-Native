import React, {useEffect, useMemo} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {useAlbums} from '../../../Context/albums-context';
import {usePhotos} from '../../../Context/photos-context';

const AlbumDetail: React.FC = () => {
  const {photos, fetchPhotos} = usePhotos();
  const {albums, selectedAlbum, setSelectedAlbum} = useAlbums();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const {id, title} = albums[selectedAlbum - 1 || 0];
  const filteredPhotos = useMemo(
    () => photos.filter(photo => photo.albumId === id),
    [photos, id],
  );

  const onBackPress = () => {
    setSelectedAlbum(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.idText}>{id}</Text>
      <Text style={styles.titleText}>{title}</Text>

      {filteredPhotos && (
        <Image style={styles.image} source={{uri: filteredPhotos[0].url}} />
      )}

      <Button title="Regresar" onPress={() => onBackPress()} />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  idText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b43333',
  },
  titleText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Franklin Gothic Medium',
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    width: 300,
    height: 300,
  },
});

export default AlbumDetail;
