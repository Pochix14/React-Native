import axios from 'axios';
import React, {createContext, useContext, useMemo, useState} from 'react';
import IPhoto from '../Models/IPhoto';

interface PhotoContextProps {
  photos: IPhoto[];
  setPhotos: (photos: IPhoto[]) => void;
  fetchPhotos: () => Promise<void>;
}

const PhotoContext = createContext<PhotoContextProps>({
  photos: [],
  setPhotos: () => {},
  fetchPhotos: () => Promise.resolve(),
});

export const PhotosProvider: React.FC = ({children}) => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const fetchPhotos = async () => {
    try {
      const fotos = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
      );
      setPhotos(fotos.data);
    } catch (error) {
      console.error(error);
    }
  };

  const valor = useMemo(
    () => ({photos, setPhotos, fetchPhotos}),
    [photos, setPhotos, fetchPhotos],
  );

  return (
    <PhotoContext.Provider value={valor}>{children}</PhotoContext.Provider>
  );
};

export const usePhotos = () => useContext(PhotoContext);
