import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Photo } from '@app/models/photo.model';

@Injectable({
    providedIn: 'root'
})
export class PhotosService {

    constructor(private http: HttpClient) { }

    getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
        const params = {
            albumId: albumId.toString()
        };

        return this.http.get<Photo[]>(`${environment.apiUrl}/photos`, { params });
    }

    countPhotos(): Observable<number> {
        return this.http.get<Photo[]>(`${environment.apiUrl}/photos`)
            .pipe(
                map((photos) => photos.length)
            );
    }
}
