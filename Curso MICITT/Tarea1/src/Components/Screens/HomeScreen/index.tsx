import React, { useState } from 'react'
import { View, } from 'react-native'
import IAlbum from '../../../Models/IAlbum';
import AlbumDetail from '../../Organisms/AlbumDetails';
import AlbumList from '../../Organisms/AlbumList'

const HomeScreen: React.FC = () => {
    // Otro estado para mostrar el album seleccionado, se permite que sea null
    const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);

    return (
        <View>
            {selectedAlbum ? (<AlbumDetail selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />) :
            (<AlbumList setCurrentAlbum={setSelectedAlbum} />) }
        </View>
    )
}

export default HomeScreen
