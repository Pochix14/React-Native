import React, {useEffect, useMemo} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IState} from '../../../Models/IState';
import {actualizarSelectedAlbum} from '../../../store/actions/Albums';
import {fetchPhotos} from '../../../store/actions/Photos';

const AlbumDetail: React.FC = () => {
  const dispatch = useDispatch();

  var selectedAlbum = useSelector(
    (state: IState) => state.Albums.selectedAlbum,
  );
  const albums = useSelector((state: IState) => state.Albums.albums);

  const {id, title} = albums[selectedAlbum - 1 || 0];
  const photos = useSelector((state: IState) => state.Photos.photos);
  const filteredPhotos = useMemo(
    () => photos.filter(photo => photo.albumId === id),
    [photos, id],
  );

  useEffect(() => {
    dispatch(fetchPhotos());
  }, []);

  const onBackPress = () => {
    dispatch(actualizarSelectedAlbum(null));
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
