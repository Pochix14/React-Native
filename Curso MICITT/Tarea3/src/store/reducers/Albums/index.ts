import {IAction} from '../../../Models/IAction';
import IAlbum from '../../../Models/IAlbum';
import {ACTUALIZAR_ALBUMS, ACTUALIZAR_SELECTED_ALBUM} from '../../actions';

export interface IAlbumReducer {
  albums: IAlbum[];
  selectedAlbum: number | null;
}

const initialState = {
  albums: [],
  selectedAlbum: null,
};

export default (state = initialState, {type, payload}: IAction) => {
  switch (type) {
    case ACTUALIZAR_ALBUMS:
      return {...state, albums: payload as IAlbum[]};

    case ACTUALIZAR_SELECTED_ALBUM:
      return {...state, selectedAlbum: payload};
    default:
      return state;
  }
};
