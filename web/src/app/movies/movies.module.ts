import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { MoviesRoutingModule } from './movies-routing.module';

import { LayoutComponent } from './layout.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DetailsComponent } from './pages/details/details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { SharedModule } from "../shared/shared.module";
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { InputSearchComponent } from './components/input-search/input-search.component';

@NgModule({
    imports: [
        CommonModule,
        MoviesRoutingModule,
        SharedModule,
        NgxPaginationModule,
    ],
    declarations: [
        LayoutComponent,
        CatalogComponent,
        DetailsComponent,
        FavoritesComponent,
        CardMovieComponent,
        InputSearchComponent,
    ],
    providers: []
})
export class MoviesModule { }