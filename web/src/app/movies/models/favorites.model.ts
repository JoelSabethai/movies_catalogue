import { IMovieResponse } from "./movies.model";

export interface IFavoritesResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: IMovieResponse[];
}