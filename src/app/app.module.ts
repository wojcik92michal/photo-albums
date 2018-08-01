import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './other/angular-material/angular-material.module';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ErrorComponent } from './components/error/error.component';
import { OfflineComponent } from './components/offline/offline.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { UsersComponent } from './pages/users/users.component';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { UsersService } from '@app/services/users/users.service';
import { SettingsService } from '@app/services/settings/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { AlbumsService } from '@app/services/albums/albums.service';
import { SingleAlbumComponent } from './pages/single-album/single-album.component';
import { PhotosService } from '@app/services/photos/photos.service';
import { SingleAlbumResolver } from '@app/other/resolvers/single-album.resolver';
import { CustomErrorHandlerService } from '@app/services/custom-error-handler/custom-error-handler.service';
import { DashboardGroupComponent } from './components/dashboard-group/dashboard-group.component';
import { CountToComponent } from '@app/components/count-to/count-to.component';


@NgModule({
    declarations: [
        AppComponent,

        SidenavComponent,
        ErrorComponent,
        OfflineComponent,
        CustomPageComponent,

        DashboardComponent,
        AlbumsComponent,
        UsersComponent,
        SingleAlbumComponent,
        CountToComponent,
        DashboardGroupComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        AppRoutingModule,
        AngularMaterialModule
    ],
    providers: [
        UsersService,
        AlbumsService,
        PhotosService,
        SettingsService,

        SingleAlbumResolver,

        {
            provide: ErrorHandler,
            useClass: CustomErrorHandlerService
        },

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
