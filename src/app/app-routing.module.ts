import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { SingleAlbumComponent } from '@app/pages/single-album/single-album.component';
import { SingleAlbumResolver } from '@app/other/resolvers/single-album.resolver';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'albums', component: AlbumsComponent },
    { path: 'album/:id', component: SingleAlbumComponent, resolve: { album: SingleAlbumResolver } },
    { path: 'users', component: UsersComponent },
    { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
