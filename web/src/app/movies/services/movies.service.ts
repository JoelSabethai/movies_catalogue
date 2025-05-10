import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IBaseResponse } from 'src/app/core/models/api.model';
import { IMoviesResponse, IMovieResponse, IConfigurationDetailsResponse } from './../models/movies.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiUrl;

  headers: HttpHeaders = new HttpHeaders({});

  constructor(private http: HttpClient) {}

  // Method to get all movies
  getMovies(page: number, search: string): Observable<IBaseResponse<IMoviesResponse>> {
    return this.http.get<IBaseResponse<IMoviesResponse>>(`${this.apiUrl}/movies`, {
        params: {
            page: page,
            searchQuery: search,
        },
        headers: this.headers
    });
  }

  // Method to get movie details by ID
  getMovieById(id: string): Observable<IBaseResponse<IMovieResponse>> {
    return this.http.get<IBaseResponse<IMovieResponse>>(`${this.apiUrl}/movies/${id}`, { headers: this.headers });
  }

  // Method to get configurations
  getConfigurations(): Observable<IBaseResponse<IConfigurationDetailsResponse>> {
    return this.http.get<IBaseResponse<IConfigurationDetailsResponse>>(`${this.apiUrl}/movies/configuration/details`, { headers: this.headers });
  }
}
