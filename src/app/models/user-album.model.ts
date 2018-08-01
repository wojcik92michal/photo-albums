import { Album } from '@app/models/album.model';
import { User } from '@app/models/user.model';

export interface UserAlbum extends Album {
    user?: User;
}
