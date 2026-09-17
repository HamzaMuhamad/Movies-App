import "./home.css";
import { moviesTopRated, showImage, trending, getMovieGenres } from "../util/API";
import type { iMultiContentResult } from "../util/API";
import { useState, useEffect } from "react";
import { ContentCard } from "../components/assets/ContentCard";


function Home() {

  let [isAhere, setIsAhere] = useState(true);
  let lastChoice = 100;
  

  function generateRandInt (): number {
    
    let randInt = Math.floor(Math.random() * 20)
    while (randInt == lastChoice) {
      randInt = Math.floor(Math.random() * 20);
    }
    lastChoice = randInt;
    return randInt
  }

  




  useEffect(() => {


    const old  = document.getElementById("old")! as HTMLImageElement;
    const recent = document.getElementById("recent")! as HTMLImageElement;
    const movieRating = document.getElementById("rating")! as HTMLParagraphElement;
    const movieGenre = document.getElementById("movie-genre")! as HTMLParagraphElement;
    const movieTitle = document.getElementById("title")! as HTMLHeadingElement;

    const interval = setInterval(() => {
      setIsAhere(!isAhere);
    }, 5000);
    

    function movieDetails (currentMovie: iMultiContentResult):void {
      movieRating.innerText = currentMovie!.vote_average.toFixed(1);
      movieTitle.innerText = currentMovie.title ?? currentMovie.name ?? "Untitled";
      movieGenre.innerText = getMovieGenres(currentMovie.genre_ids).join(", ");
    }


    let currentRandInt = generateRandInt();
    let currentMovie = moviesTopRated?.results[currentRandInt];
    if (isAhere) {
      currentRandInt = generateRandInt();
      currentMovie = moviesTopRated?.results[currentRandInt];
      
      
      recent.src = showImage(currentMovie.poster_path);
      movieDetails(currentMovie);
      
      
    } else if (!isAhere) {
      currentRandInt = generateRandInt();
      currentMovie = moviesTopRated?.results[currentRandInt];

      old.src = showImage(currentMovie.poster_path);
      
      movieDetails(currentMovie);
      
    }
    
    return () => clearInterval(interval);
  }, [isAhere]);
  

      // Trending movies Display Function ***
  function trendingNowMovies (): React.JSX.Element[] {

    let movies: React.JSX.Element[] = [] ;
    let trendingResults = trending.results;

    trendingResults.forEach((movie): void => {
      let title = movie.title ? movie.title : movie.name as string;
      let genre = getMovieGenres(movie.genre_ids).join(", ");
      let movieRate = movie.vote_average;
      let movieImgUrl = showImage(movie.poster_path) ;

      movies.push(<ContentCard title={title} genre={genre} contentRate={movieRate} movieImgUrl={movieImgUrl} />);

    })

    return movies

  }

  return (

      <main className="bg-[#131314]"> {/*HAS A BEFORE */}

        <section id="movies-crossfade" className="overlay relative mb-6 h-[60vh]">

          <img id="recent" className="absolute h-full w-full object-cover " alt="" />
          <img id="old" className="absolute h-full w-full object-cover "   alt="" />

          <section className="absolute z-10 flex h-16 w-full items-center justify-between bg-[#131314cc] px-4 backdrop-blur-md">

            <div className="cursor-pointer">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 7L6.55 9.05L4.5 10L6.55 10.95L7.5 13L8.45 10.95L10.5 10L8.45 9.05L7.5 7ZM13.5 7L12.85 8.35L11.5 9L12.85 9.65L13.5 11L14.15 9.65L15.5 9L14.15 8.35L13.5 7ZM2 0L4 4H7L5 0H7L9 4H12L10 0H12L14 4H17L15 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0ZM2 6V14H18V6H2Z"
                  fill="#CBC3D7"
                />
              </svg>
            </div>


            <h1 className="text-[2.5rem] leading-12 font-black tracking-[-2px] text-primary-200">CINEMATIQUE</h1>

            <div className="cursor-pointer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
                  fill="#CBC3D7"
                />
              </svg>
            </div>
            

          </section>

          <section className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-6">

            <div className="mb-3 flex items-center justify-center gap-2 rounded-full bg-[#201f20] px-3 py-1 inset-ring-1 inset-ring-[#ffffff1a] backdrop-blur-md">

              <div className="flex items-center justify-center gap-2"> {/* Rating */ }
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z" fill="#FFB95F"/>
                </svg>

                <p id="rating" className="text-sm leading-[19.6px] font-semibold tracking-[0.28px] text-[#FFB95F] ">8.7</p>
              </div>

              <p className="text-xs text-[#958EA0]">•</p>

              <p id="movie-genre" className="text-xs leading-[14.4px] font-medium tracking-[0.6px] text-[#958EA0]">Sci-Fi, Drama</p> {/* Genre */}


            </div>

            <h2 id="title" className="tracking[-0.8px] pb-4 text-center text-[40px] leading-12 font-extrabold text-[#E5E2E3] ">Interstellar</h2>



            {/* *** After creating the Movie component, You have to back here and add the link to the Movie *** */}
            <button className="flex h-11 w-70 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-200 px-6 py-2">

              <div> {/* SVG Container */}
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 14V0L11 7L0 14Z" fill="#23005C"/>
                </svg>

              </div>
              <p className="text-sm leading-[19.6px] font-semibold tracking-[0.28px] text-[#23005C]">View Details</p>

            </button>
            
          </section>

        </section>

        <section className="pl-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl leading-7.5 font-semibold text-[#E5E2E3]">Trending Now</h2>
            <button className="cursor-pointer pr-4 text-xs leading-3.5 font-medium tracking-[0.6px] text-primary-200">See All</button>
          </div>

          <div className="flex scrollbar-none gap-4 overflow-x-auto ">
            {trendingNowMovies()}

          </div>
        </section>

      </main>

  );
}

export default Home;
