import "./home.css";
import { moviesTopRated, showImage, moviesGenre, trending } from "../util/API";
import { useState, useEffect } from "react";


  //* Mini component for trening movies ***
function TrendingMovie ({title, genre, movieRate, movieImgUrl}: {title: string, genre: string, movieRate: number, movieImgUrl: string}): React.JSX.Element {
  //? HERE: I will need `Id` my for click event to open the movie page ...
  return (
    <article className="min-w-35 relative">
      <div className="rounded-xl bg-[#181c1f] inset-ring-1 inset-ring-[#ffffff1a] h-52.5 py-4 px-2 mb-2">
        <img className="w-full h-full object-cover" src={movieImgUrl} alt={title} />
      </div>

      <section className="absolute top-2 left-2 rounded-md bg-[rgba(19,19,20,.8)] backdrop-blur-sm py-1 px-2 flex items-center gap-1">

        <span className="  ">
          <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.59375 7.91667L2.27083 4.98958L0 3.02083L3 2.76042L4.16667 0L5.33333 2.76042L8.33333 3.02083L6.0625 4.98958L6.73958 7.91667L4.16667 6.36458L1.59375 7.91667Z" fill="#FFB95F"/>
          </svg>
        </span>

        <span className="text-[#E5E2E3] text-[10px] leading-4">{movieRate.toFixed(1)}</span>
      </section>

      <section>
        <h3 className="text-[#E5E2E3] font-semibold text-sm leading-5 tracking-[0.28px]">{title}</h3>
        <p className="text-[#B4B1B9] text-[10px] leading-4">{genre}</p>
      </section>
    </article>
  )
}


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

  function getMovieGenres(ids: number[]): string {
      let genres: string[] = [];
      moviesGenre?.genres.forEach((category:{id:number, name:string}):void => {
        ids.forEach((current:number):void => {
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

      if (genres.length == 1) {
        return genres[0]
      }

      let result = "";

      genres.forEach((item):void => {
        if (result.length == 0) {
          result += item
        } else {
          result += `, ${item}`

        }
      }) ;


      return result;
      

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
    

    // Identifying result inside movies API
    interface result {
    [index: string]:string | number | boolean | number[],
    genre_ids: number[],
    poster_path: string,
    title: string,
    vote_average: number
    }[]


    function movieDetails (currentMovie: result):void {
      movieRating.innerText = currentMovie!.vote_average.toFixed(1);
      movieTitle.innerText = currentMovie!.title;
      movieGenre.innerText = getMovieGenres(currentMovie.genre_ids);
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

    console.log(trending)
    let movies: React.JSX.Element[] = [] ;
    let trendingResults = trending.results;

    trendingResults.forEach((movie): void => {
      let title = movie.title ? movie.title : movie.name as string;
      let genre = getMovieGenres(movie.genre_ids);
      let movieRate = movie.vote_average;
      let movieImgUrl = showImage(movie.poster_path) ;

      movies.push(<TrendingMovie title={title} genre={genre} movieRate={movieRate} movieImgUrl={movieImgUrl} />);

    })

    return movies

  }

  return (

      <main className="bg-[#131314]"> {/*HAS A BEFORE */}

        <section id="movies-crossfade" className="relative h-[60vh] mb-6">

          <img id="recent" className="object-cover absolute w-full h-full " alt="" />
          <img id="old" className="object-cover absolute w-full h-full "   alt="" />

          <section className="flex items-center justify-between h-16 px-4 bg-[#131314cc] absolute w-full backdrop-blur-md z-10">

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


            <h1 className="font-black text-[2.5rem] text-primary-200 tracking-[-2px] leading-12">CINEMATIQUE</h1>

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

          <section className="h-full flex flex-col items-center justify-end px-4 pb-6 relative z-10">

            <div className="flex items-center justify-center gap-2 mb-3 bg-[#201f20] px-3 py-1 rounded-full inset-ring-1 inset-ring-[#ffffff1a] backdrop-blur-md">

              <div className="flex items-center justify-center gap-2"> {/* Rating */ }
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z" fill="#FFB95F"/>
                </svg>

                <p id="rating" className="text-sm text-[#FFB95F] leading-[19.6px] tracking-[0.28px] font-semibold ">8.7</p>
              </div>

              <p className="text-[#958EA0] text-xs">•</p>

              <p id="movie-genre" className="text-[#958EA0] text-xs font-medium leading-[14.4px] tracking-[0.6px]">Sci-Fi, Drama</p> {/* Genre */}


            </div>

            <h2 id="title" className="text-[#E5E2E3] pb-4 leading-12 tracking[-0.8px] text-[40px] font-extrabold text-center ">Interstellar</h2>



            {/* *** After creating the Movie component, You have to back here and add the link to the Movie *** */}
            <button className="bg-primary-200 flex items-center justify-center gap-2 px-6 py-2 rounded-xl w-70 h-11 cursor-pointer">

              <div> {/* SVG Container */}
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 14V0L11 7L0 14Z" fill="#23005C"/>
                </svg>

              </div>
              <p className="font-semibold text-sm leading-[19.6px] tracking-[0.28px] text-[#23005C]">View Details</p>

            </button>
            
          </section>

        </section>

        <section className="pl-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[#E5E2E3] leading-7.5">Trending Now</h2>
            <button className="pr-4 text-primary-200 leading-3.5 text-xs tracking-[0.6px] font-medium cursor-pointer">See All</button>
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-none ">
            {trendingNowMovies()}

          </div>
        </section>

      </main>

  );
}

export default Home;
