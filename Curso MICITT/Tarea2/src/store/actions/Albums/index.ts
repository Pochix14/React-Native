import axios from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import {ACTUALIZAR_ALBUMS, ACTUALIZAR_SELECTED_ALBUM} from '..';
import {IAction} from '../../../Models/IAction';
import IAlbum from '../../../Models/IAlbum';
import {IState} from '../../../Models/IState';

export const actualizarAlbums = (payload: IAlbum[]) => ({
  type: ACTUALIZAR_ALBUMS,
  payload,
});

export const actualizarSelectedAlbum = (payload: number | null) => ({
  type: ACTUALIZAR_SELECTED_ALBUM,
  payload,
});

export const fetchAlbums =
  () => async (dispatch: ThunkDispatch<IState, null, IAction>) => {
    try {
      const albums = await axios.get(
        'https://jsonplaceholder.typicode.com/albums',
      );
      dispatch(actualizarAlbums(albums.data));
    } catch (error) {
      console.error(error);
    }
  };
