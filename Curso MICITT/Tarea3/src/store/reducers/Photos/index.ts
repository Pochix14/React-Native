import {IAction} from '../../../Models/IAction';
import IPhoto from '../../../Models/IPhoto';
import {ACUTALIZAR_PHOTOS} from '../../actions';

export interface IPhotoReducer {
  photos: IPhoto[];
}

const initialState = {
  photos: [],
};

export default (
  state = initialState,
  {type, payload}: IAction,
): IPhotoReducer => {
  switch (type) {
    case ACUTALIZAR_PHOTOS:
      return {...state, photos: payload as IPhoto[]};
    default:
      return state;
  }
};
