import {IAlbumReducer} from '../store/reducers/Albums';
import {IPhotoReducer} from '../store/reducers/Photos';

export interface IState {
  Albums: IAlbumReducer;
  Photos: IPhotoReducer;
}
