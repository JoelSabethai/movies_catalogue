import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';

import { IImages, IMovieResponse } from '../../models/movies.model';

@Component({
  selector: 'favorites-component',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  configImages!: IImages;
  movies: IMovieResponse[] = [];
  totalMovies: number = 0;
  itemsPerPage: number = 20;
  page: number = 1;
  search: string = '';

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoritesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(): void {
    this.movieService.getConfigurations().subscribe(
      (response) => {
        this.configImages = response.data.images;
        this.getFavoriteMovies();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  getFavoriteMovies(): void {
    this.favoriteService.getFavoriteMovies(this.page, this.search).subscribe(
      (response) => {
        this.movies = response.data.results;
        this.totalMovies = response.data.total_results;
        this.page = response.data.page;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  changedPage(page: number): void {
    this.page = page;
    this.getFavoriteMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(value: string): void {
    this.search = value;
    this.getFavoriteMovies();
  }

  handleRemoveFromFavorite(movieId: number): void {
    this.getFavoriteMovies();
  }
}
