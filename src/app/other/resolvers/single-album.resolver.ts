import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import { Album } from '@app/models/album.model';
import { AlbumsService } from '@app/services/albums/albums.service';
import { SettingsService } from '@app/services/settings/settings.service';

@Injectable()
export class SingleAlbumResolver implements Resolve<Album> {
    constructor(
        private albumService: AlbumsService,
        private settingsService: SettingsService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const albumId = +route.paramMap.get('id');
        const backUrl = '/albums';
        if (isNaN(+albumId)) {
            this.router.navigate([backUrl]);
            return of(null);
        }

        this.settingsService.showlobalLoadingIndicator();

        return this.albumService
            .getAlbumById(albumId)
            .pipe(
                finalize(
                    () => this.settingsService.hideGlobalLoadingIndicator()
                ),
                catchError((err) => {
                    this.router.navigate([backUrl]);
                    return of(null);
                })
            );
    }
}
