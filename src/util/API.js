

let moviesUrl = "https://api.themoviedb.org/3/movie/changes?page=1?api_key=09dfd7f3f3db787250f9ac1837252c17";

let moviesGenreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=09dfd7f3f3db787250f9ac1837252c17";

let tvShowsUrl = "https://api.themoviedb.org/3/tv/changes?page=1?api_key=09dfd7f3f3db787250f9ac1837252c17";

let actorsUrl = "https://api.themoviedb.org/3/person/changes?page=1?api_key=09dfd7f3f3db787250f9ac1837252c17";

let trendingUrl = "https://api.themoviedb.org/3/trending/all/day?language=en-US?api_key=09dfd7f3f3db787250f9ac1837252c17";

let topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=09dfd7f3f3db787250f9ac1837252c17";



let options = {method: "GET",headers: {accept: "application/json", Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWRmZDdmM2YzZGI3ODcyNTBmOWFjMTgzNzI1MmMxNyIsIm5iZiI6MTc4NzQxMjcwNC42MDgsInN1YiI6IjZhODljMGUwOWExYmI4ZGEwYjcxZTQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aps3RWzYPyuXoPMv2dNMK750lqHQXsVRf-f64sou8QY"}};


async function fetching (url) {
  const TMBDAPI = await fetch(url, options);
  const data = await TMBDAPI.json();

  return data;

}

const movies = await fetching(moviesUrl);
const moviesGenre = await fetching(moviesGenreUrl);
const tvShows = await fetching(tvShowsUrl);
const actors = await fetching(actorsUrl);
const trending = await fetching(trendingUrl);
const moviesTopRated = await fetching(topRatedUrl);


function showImage(posterPath) {
  return `https://image.tmdb.org/t/p/w500/${posterPath}`
}


export { movies, moviesGenre, tvShows, actors, trending, moviesTopRated, showImage };

