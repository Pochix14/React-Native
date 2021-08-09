import axios from 'axios';
import {ThunkDispatch} from 'redux-thunk';
import {ACUTALIZAR_PHOTOS} from '..';
import {IAction} from '../../../Models/IAction';
import IPhoto from '../../../Models/IPhoto';
import {IState} from '../../../Models/IState';

export const actualizarPhotos = (payload: IPhoto[]): IAction => ({
  type: ACUTALIZAR_PHOTOS,
  payload,
});

export const fetchPhotos =
  () => async (dispatch: ThunkDispatch<IState, null, IAction>) => {
    try {
      const photos = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
      );
      dispatch(actualizarPhotos(photos.data));
    } catch (error) {
      console.error(error);
    }
  };
