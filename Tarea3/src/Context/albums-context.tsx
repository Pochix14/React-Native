import axios from 'axios';
import React, {createContext, useContext, useMemo, useState} from 'react';
import IAlbum from '../Models/IAlbum';

interface AlbumContextProps {
  albums: IAlbum[];
  setAlbums: (albums: IAlbum[]) => void;
  selectedAlbum: number | null;
  setSelectedAlbum: (album: number | null) => void;
  fetchAlbums: () => Promise<void>;
}

const AlbumContext = createContext<AlbumContextProps>({
  albums: [],
  setAlbums: () => {},
  selectedAlbum: null,
  setSelectedAlbum: () => {},
  fetchAlbums: () => Promise.resolve(),
});

export const AlbumsProvider: React.FC = ({children}) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  const fetchAlbums = async () => {
    try {
      const albumes = await axios.get(
        'https://jsonplaceholder.typicode.com/albums',
      );
      setAlbums(albumes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const valor = useMemo(
    () => ({
      albums,
      setAlbums,
      selectedAlbum,
      setSelectedAlbum,
      fetchAlbums,
    }),
    [albums, setAlbums, selectedAlbum, setSelectedAlbum, fetchAlbums],
  );
  return (
    <AlbumContext.Provider value={valor}>{children}</AlbumContext.Provider>
  );
};

export const useAlbums = () => useContext(AlbumContext);
