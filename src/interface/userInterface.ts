export interface Imovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  // genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface Imovies {
  page: number;
  results: Imovie[];
  total_results: number;
  total_pages: number;
}
