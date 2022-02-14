import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import AlbumListItem from '../../Molecules/AlbumListItem.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {IState} from '../../../Models/IState';
import {fetchAlbums} from '../../../store/actions/Albums';

const AlbumList: React.FC = () => {
  const albumes = useSelector((state: IState) => state.Albums.albums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  return (
    <View>
      {albumes.length > 0 ? (
        <FlatList
          data={albumes}
          renderItem={({item}) => <AlbumListItem album={item} />}
        />
      ) : (
        <ActivityIndicator color="#000" />
      )}
    </View>
  );
};

export default AlbumList;
