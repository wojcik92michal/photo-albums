import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Album } from '@app/models/album.model';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {

    constructor(private http: HttpClient) { }

    getAllAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>(`${environment.apiUrl}/albums`);
    }

    getAlbumById(albumId: number): Observable<Album> {
        return this.http.get<Album>(`${environment.apiUrl}/albums/${albumId}`);
    }

    countAlbums(): Observable<number> {
        return this.getAllAlbums()
            .pipe(
                map((albums) => albums.length)
            );
    }
}
