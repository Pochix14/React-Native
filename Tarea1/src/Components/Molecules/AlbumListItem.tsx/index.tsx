import styled from '@emotion/native'
import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import IAlbum from '../../../Models/IAlbum'

export interface AlbumListItemProps {
    album: IAlbum;
    index: number;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<IAlbum | null>>; 
}

const AlbumListItem: React.FC<AlbumListItemProps> = ({album, index, setSelectedAlbum}) => {

    const onPress = () => {
        setSelectedAlbum(album);
    }

    return (
        <ItemContainer onPress={onPress} >
            <TextStyle>{++index}. {album.title}</TextStyle>
            {album.photos && <ImageStyle source={{uri: album.photos[0].thumbnailUrl}}/>}
        </ItemContainer>
    )
}

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
    align-self: flex-end;
`;

export default AlbumListItem
