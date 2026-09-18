export interface iContent {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: object | null;
  budget?: number;
  created_by?: object[];
  episode_run_time?: number[];
  first_air_date?: string;
  genres: iGenre[];
  homepage: string;
  id: number;
  imdb_id?: string;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: object | null;
  name?: string;
  networks?: object[];
  next_episode_to_air?: object | null;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  seasons?: object[];
  softcore: boolean;
  spoken_languages: {english_name: string}[];
  status: string;
  tagline: string;
  title?: string;
  type?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}


interface iGenre {
    id: number;
    name: string;
  }


// _________________________________________________________________________________

/** A paginated TMDB content-list response (for example, top-rated movies). */
export interface iMutliContent {
  page: number;
  results: iMultiContentResult[];
  total_pages: number;
  total_results: number;
}

export interface iMultiContentResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  softcore?: boolean;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface iKnownFor extends iMultiContentResult {
  character: string,
  first_credit_air_date: string
}





interface iCast {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

interface iCrew {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: string,
  department: string,
  job: string
}

export interface iActedIn {
  id: number;
  cast: iCast[];
  crew: iCrew[]
}

export interface iPerson {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number; // 0: Not set, 1: Female, 2: Male, 3: Non-binary
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}

export const MONTHS:string[];

export const movies: iMutliContent;
export const moviesGenre: {genres: {id:number, name:string}[]};
export const tvShows: iMutliContent;
export const trending: iMutliContent;
export const moviesTopRated: iMutliContent;


export const fetchCastAndCrew: (isMovie: boolean, id: number) => Promise<iActedIn>;
export const fetchSimilarContent: (isMovie: boolean, id: number) => Promise<iMutliContent>;
export const castAndCrewUrl: (contentId: number) => string;
export let showImage: (posterPath: string) => string;
export const movieById: (id: number) => Promise<iContent>;
export const tvById: (id: number) => Promise<iContent>;
export const personById: (personId: number) => Promise<iPerson>; 
export const moviesWorksURL: (personId: number) => Promise<iKnownFor[]>;
export const tvWorksURL: (personId: number) => Promise<iKnownFor[]>;
export function getMovieGenres(ids: number[]): string[];