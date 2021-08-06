import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios';
import IAlbum from '../../../Models/IAlbum';
import IPhoto from '../../../Models/IPhoto';
import AlbumListItem from '../../Molecules/AlbumListItem.tsx';

// Interface con los tipos de datos que recibe como props
interface AlbumListProps {
    setCurrentAlbum: React.Dispatch<React.SetStateAction<IAlbum | null>>;
}    

const AlbumList: React.FC<AlbumListProps> = ({setCurrentAlbum}) => {   
    // Estado para guardar lista inicializado con el model
    const [albumes, setAlbumes] = useState<IAlbum[]>([]);

    // Funcion que hace llamado al API
    const fetchAlbumes = async () => {
        try {
            const listaAlbumes = await axios.get('https://jsonplaceholder.typicode.com/albums',);
            const listaPhotos = await axios.get('https://jsonplaceholder.typicode.com/photos',);

            // Mapea el resultado de los llamados y edita las fotos correspondiente
            const albums = (listaAlbumes.data as IAlbum[]).map((album) => ({
                // Esto busca en objeto y sobre-escribe solamente el campo que se especifique
                ...album,
                photos: (listaPhotos.data as IPhoto[]).filter((photo) => photo.albumId === album.id)
            }))

            // Setea albumes con el resultado de las operaciones anteriores
            setAlbumes(albums);
        } catch (error) {
            console.error(error);
        }
    };

    // Funcion que se llama al presionar sobre una fila para obtener ese elemento
    const onAlbumClick = (album: IAlbum) => {
        setCurrentAlbum(album);
    };

    // Para llamar funciones al cargar
    useEffect(() => {
        fetchAlbumes();
    }, []);

    return (
        <View>
            {albumes.length > 0 ? 
                (<FlatList 
                data={albumes}
                renderItem={({item, index}) =>
                (<AlbumListItem album={item} index={index} setSelectedAlbum={setCurrentAlbum}/>)
                }/>)
                 :
                (<ActivityIndicator color="#000"/>)}
        </View>
    )
}



export default AlbumList
