import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from '../../services/movies.service';

import { IImages, IMoviesResults } from '../../models/movies.model';

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  configImages!: IImages;

  movies: IMoviesResults[] = [];
  totalMovies: number = 0;
  itemsPerPage: number = 20;
  page: number = 1;
  search: string = '';

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(): void {
    this.movieService.getConfigurations()
      .subscribe(
        (response) => {
          this.configImages = response.data.images;
          this.getMovies();
        },
        (error) => {
          this.toastr.error(error);
        }
      )
  }

  getMovies(): void {
    this.movieService.getMovies(this.page, this.search)
      .subscribe(
        (response) => {
          this.movies = response.data.results;
          this.totalMovies = response.data.total_results;
          this.page = response.data.page;
        },
        (error) => {
          this.toastr.error(error);
        }
      )
  }

  changedPage(page: number): void {
    this.page = page;
    this.getMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(value: string): void {
    this.search = value;
    this.getMovies();
  }

  handleAddToFavorite(movieId: number): void {
    const movie = this.movies.find(m => m.id === movieId);
    if (movie) movie.favorite = true;
  }
  
  handleRemoveFromFavorite(movieId: number): void {
    const movie = this.movies.find(m => m.id === movieId);
    if (movie) movie.favorite = false;
  }
}