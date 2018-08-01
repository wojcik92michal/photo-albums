import { Component, OnInit, OnDestroy } from '@angular/core';

import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AlbumsService } from '@app/services/albums/albums.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { UsersService } from '@app/services/users/users.service';
import { User } from '@app/models/user.model';
import { UserAlbum } from '@app/models/user-album.model';

@Component({
    selector: 'pg-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

    albums: UserAlbum[];

    private unsubscribe: Subject<void>;

    constructor(
        private albumsService: AlbumsService,
        private settingsService: SettingsService,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.unsubscribe = new Subject();

        this.loadAlbums();
    }

    showUserInfo(index: number): void {
        const userAlbum = this.albums[index];
        this.settingsService.showlobalLoadingIndicator();

        this.usersService
            .getUserById(userAlbum.userId)
            .pipe(
                finalize(() => this.settingsService.hideGlobalLoadingIndicator())
            )
            .subscribe((user: User) => {
                this.albums[index].user = user;
            });
    }

    private loadAlbums(): void {
        this.settingsService.showlobalLoadingIndicator();

        this.albumsService
            .getAllAlbums()
            .pipe(
                finalize(() => this.settingsService.hideGlobalLoadingIndicator()),
                takeUntil(this.unsubscribe)
            )
            .subscribe((albums: UserAlbum[]) => {
                this.albums = albums;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
