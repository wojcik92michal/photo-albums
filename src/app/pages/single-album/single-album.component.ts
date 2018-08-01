import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Album } from '@app/models/album.model';
import { Photo } from '@app/models/photo.model';
import { PhotosService } from '@app/services/photos/photos.service';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
    selector: 'pg-single-album',
    templateUrl: './single-album.component.html',
    styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent implements OnInit, OnDestroy {

    album: Album;
    photos: Photo[];
    albumId: number;

    private unsubscribe: Subject<void>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private photosService: PhotosService,
        private settingsService: SettingsService
    ) { }

    ngOnInit() {
        this.unsubscribe = new Subject();

        this.album = this.activatedRoute.snapshot.data['album'];

        this.activatedRoute.paramMap
            .subscribe(
                params => {
                    this.albumId = Number(params.get('id'));
                }
            );

        this.loadPhotos();
    }

    private loadPhotos(): void {
        this.settingsService.showlobalLoadingIndicator();

        this.photosService
            .getPhotosByAlbumId(this.albumId)
            .pipe(
                finalize(() => this.settingsService.hideGlobalLoadingIndicator()),
                takeUntil(this.unsubscribe)
            )
            .subscribe((photos) => {
                this.photos = photos;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
