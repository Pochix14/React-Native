import IAlbum from './IAlbum';
import IPhoto from './IPhoto';

export interface IAction {
  type: string;
  payload?: string | number | IAlbum[] | IPhoto[];
}
