import { Component, OnInit, OnDestroy } from '@angular/core';

import { finalize, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

import { UsersService } from '@app/services/users/users.service';
import { AlbumsService } from '@app/services/albums/albums.service';
import { PhotosService } from '@app/services/photos/photos.service';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
    selector: 'pg-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    usersNum: number;
    albumsNum: number;
    photosNum: number;

    private unsubscribe: Subject<void>;

    constructor(
        private usersService: UsersService,
        private albumsService: AlbumsService,
        private photosService: PhotosService,
        private settingsService: SettingsService
    ) { }

    ngOnInit() {
        this.unsubscribe = new Subject();

        this.loadData();
    }

    private loadData(): void {
        this.settingsService.showlobalLoadingIndicator();

        combineLatest(
            this.usersService.countUsers(),
            this.albumsService.countAlbums(),
            this.photosService.countPhotos()
        )
            .pipe(
                finalize(() => this.settingsService.hideGlobalLoadingIndicator()),
                takeUntil(this.unsubscribe)
            )
            .subscribe(([usersNum, albumsNum, photosNum]) => {
                this.usersNum = usersNum;
                this.albumsNum = albumsNum;
                this.photosNum = photosNum;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
