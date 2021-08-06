import React from 'react'
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
import IAlbum from '../../../Models/IAlbum'

export interface AlbumDetailsProps {
    selectedAlbum: IAlbum;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<IAlbum | null>>;
}

const AlbumDetail: React.FC<AlbumDetailsProps> = ({selectedAlbum, setSelectedAlbum}) => {

    const onBackPress = () => {
        setSelectedAlbum(null);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.idText}>{selectedAlbum.id}</Text>
            <Text style={styles.titleText}>{selectedAlbum.title}</Text>

            {selectedAlbum.photos &&
             (<Image style={styles.image} source={{uri: selectedAlbum.photos[0].url}}/>)}
            
            <Button title="Regresar" onPress={() => onBackPress()}/>
        </View>
    )
}

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

export default AlbumDetail
