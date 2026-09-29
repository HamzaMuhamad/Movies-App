
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



let moviesUrl = "https://api.themoviedb.org/3/discover/movie";

let moviesGenreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";

let tvShowsUrl = "https://api.themoviedb.org/3/discover/tv";

let trendingUrl = "https://api.themoviedb.org/3/trending/all/day?language=en-US";

let topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

let personsPopularUrl = "https://api.themoviedb.org/3/person/popular";



let options = {method: "GET",headers: {accept: "application/json", Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWRmZDdmM2YzZGI3ODcyNTBmOWFjMTgzNzI1MmMxNyIsIm5iZiI6MTc4NzQxMjcwNC42MDgsInN1YiI6IjZhODljMGUwOWExYmI4ZGEwYjcxZTQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aps3RWzYPyuXoPMv2dNMK750lqHQXsVRf-f64sou8QY"}};


async function fetching (url) {
  const TMBDAPI = await fetch(url, options);
  const data = await TMBDAPI.json();
  
  return data;
  
}


const movies = await fetching(moviesUrl);
const moviesGenre = await fetching(moviesGenreUrl);
const tvShows = await fetching(tvShowsUrl);
const trending = await fetching(trendingUrl);
const moviesTopRated = await fetching(topRatedUrl);
const personsPopular = await fetching(personsPopularUrl);




const fetchCastAndCrew = async (isMovie, contentId) => {
  return await fetching(`https://api.themoviedb.org/3/${isMovie?"movie":"tv"}/${contentId}/credits`);
};

const fetchSimilarContent= async (isMovie, contentId) => {
  return await fetching(`https://api.themoviedb.org/3/${isMovie?"movie":"tv"}/${contentId}/similar`);
};

const movieById = async function (id) {
  let raw = await fetching(`https://api.themoviedb.org/3/movie/${id}?`);
  
  return raw
}

const tvById = async function (id) {
  let raw = await fetching(`https://api.themoviedb.org/3/tv/${id}?`)
  
  return raw
}



const personById = async function (personId) {
  let raw = await fetching(`https://api.themoviedb.org/3/person/${personId}?`)
  return raw
}

const moviesWorksURL = async (personId) => {
  
  let raw = await fetching(`https://api.themoviedb.org/3/person/${personId}/movie_credits`);
  return raw.cast;
};

const tvWorksURL = async (personId) => {
  let raw = await fetching(`https://api.themoviedb.org/3/person/${personId}/tv_credits`);
  return raw.cast;

};

function search (searchQuery, pageNumber) {
  return fetching(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&page=${pageNumber}`);
}



function showImage(posterPath) {
  return `https://image.tmdb.org/t/p/w500/${posterPath}`
}



  /**
   * Returns the orgainzed move genres ', ' 
   * 
   * @param {number[]} ids 
   * @returns {string}*/ 
  function getMovieGenres(ids) {
      let genres = [];
      moviesGenre?.genres.forEach((category) => {
        ids.forEach((current) => {
          if (category.id == current) {
            if (category.name.startsWith("Science")) {
              genres.push("Sci-Fi")

            } else if (category.name.startsWith("Doc")) {
              genres.push("Doc")

            } else if (category.name.startsWith("Anim")) {
              genres.push("Anime")

            } else {
              genres.push(category.name)

            }
          }
        })
      })


      return genres;
      

  }

export { movies, moviesGenre, tvShows, fetchCastAndCrew, trending, moviesTopRated, movieById, tvById, showImage, getMovieGenres, fetchSimilarContent, personById, moviesWorksURL, tvWorksURL, personsPopular, search };