import styled from '@emotion/native';
import React, {useMemo} from 'react';
import {useAlbums} from '../../../Context/albums-context';
import IAlbum from '../../../Models/IAlbum';
import IPhoto from '../../../Models/IPhoto';

export interface AlbumListItemProps {
  album: IAlbum;
  photos: IPhoto[];
}

const AlbumListItem: React.FC<AlbumListItemProps> = ({album, photos}) => {
  const {setSelectedAlbum} = useAlbums();

  const filteredPhotos = useMemo(
    () => photos.filter(photo => photo.albumId === album.id),
    [photos, album.id],
  );

  const onPress = () => {
    setSelectedAlbum(album.id);
  };

  return (
    <ItemContainer onPress={onPress}>
      <TextStyle>
        {album.id}. {album.title}
      </TextStyle>
      {filteredPhotos && (
        <ImageStyle source={{uri: filteredPhotos[0].thumbnailUrl}} />
      )}
    </ItemContainer>
  );
};

const ItemContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ebecf0;
  border-radius: 32px;
  padding: 8px 12px;
  margin: 4px 0;
`;

const TextStyle = styled.Text`
  text-transform: capitalize;
  width: 85%;
`;

const ImageStyle = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 2px;
  align-self: flex-end;
`;

export default AlbumListItem;
