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

interface ImovieDetailGenres {
  id: number;
  name: string;
}
interface ImovieDetailProduction {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface ImovieDetailProductionContry {
  iso_3166_1: string;
  name: string;
}
interface ImovieDetailLanguage {
  iso_639_1: string;
  name: string;
}

export interface ImovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: ImovieDetailGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ImovieDetailProduction[];
  production_countries: ImovieDetailProductionContry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ImovieDetailLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
