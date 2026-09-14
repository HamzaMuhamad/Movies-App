interface content  {
  page:number,
  results: {
    [index: string]:string | boolean | number[],
    genre_ids: number[],
    poster_path: string,
    title: string,
    vote_average: number
  }[],
  total_pages: number,
  total_results: number
}


export const movies: content;
export const moviesGenre: {genres: {id:number, name:string}[]};
export const tvShows: content;
export const actors: content;
export const trending: content;
export const moviesTopRated: content;
export let showImage: (posterPath: string) => string;
