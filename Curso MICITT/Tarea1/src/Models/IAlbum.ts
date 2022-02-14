import IPhoto from "./IPhoto";

// Modelo del Album del API
export default interface IAlbum {
    userId: number;
    id: number;
    title: string;
    photos?: IPhoto[];
}