import { movieById, tvById, showImage, fetchCastAndCrew, fetchSimilarContent, MONTHS } from "../../util/API";
import type { iContent, iActedIn, iMutliContent, iMultiContentResult } from "../../util/API";
import { useEffect, useState } from "react";
import { SimilarContent } from "../../components/assets/ContentCard";
import Toolbar from "../../components/toolbar/Toolbar";
import About from "../../components/about/About";
import "./content.css";



function ContentDetails({
  isMovie,
  id,
}: {
  isMovie: boolean;
  id: number;
}): React.JSX.Element {
  


  const [currentContent, setCurrentContent] = useState<iContent | undefined>();
  const [castAndCrew, setCastAndCrew] = useState<iActedIn | undefined>();
  const [similarContent, setSimilarContent] = useState<iMutliContent | undefined>();
  
  // For Manipulate Movie/TV + Getting the Cast&Crew 
  useEffect(() => {
    let theContent = isMovie
    ? movieById
    : tvById;


    let fetchedContentData = async () => {
      let result = await theContent(id);
      setCurrentContent(result);
    };

    fetchedContentData();

    // _-_-_-_-_-_-_-_-_-C-_-_-R-_-_-E-_-_-W-_-_-_-_-_-_-_-_-_-_-_-
  

    let startCastAndCrew = async () => {
      let result = await fetchCastAndCrew(isMovie, id);
      setCastAndCrew(result);
    }

    startCastAndCrew();

    // _-_-_-_-_-_-_-_-_-S-_-_-I-_-_-M-_-_-I-_-_-_-_-_-_-_-_-_-_-_-


    let startSimilarContent = async() => {
      let result = await fetchSimilarContent(isMovie, id);
      setSimilarContent(result);
    };

    startSimilarContent();
  }, []);

  


  
  
  // Functions to get Data 
  function getTitle () {
    return currentContent?.title 
    ? currentContent?.title
    : currentContent?.name 
    ;
  };


  /**
   * [YEAR, MONTH, DAY] */
  function releaseDate (content: iContent | iMultiContentResult ): number[] {
    let date = content?.release_date ?? content?.first_air_date ?? "unknown";  
    
    return date!.split('-').map((item) => +item);
  };



  function rating () {
    return currentContent?.vote_average.toFixed(1)
  };

  function time() {
    return currentContent?.runtime
  };


  
  function genresDisplay(): React.JSX.Element[] {
    let spans: React.JSX.Element[] = [];
    let result = currentContent?.genres.map(genre => genre.name);

    spans = result!.map((text) => {
      return(
        <span key={text} className="pt-0.75 pb-[4.39px] px-3 bg-[#2A2A2B] text-off-white rounded-full leading-3.5 tracking-[0.6px] text-center inset-ring-1 inset-ring-[#ffffff1a] text-xs">{text}</span>
      )
    })
    
    return spans
  }



  function castDisplay(): React.JSX.Element[] | undefined {
    let spans: React.JSX.Element[] | undefined = [];

    spans = castAndCrew?.cast?.map((actor) => {
      let name = actor.name;
      let character = actor.character;
      let profilePath = actor.profile_path;
      return (
        <span key={name} className="w-30 text-center">
          <div className="w-30 h-30 border-2 border-[#ffffff1a] rounded-full overflow-hidden">
            <img src={profilePath 
              ? showImage(profilePath)
              :"/images/undefined.png"} alt={name} className="w-full h-full object-cover"/>
          </div>

          <p className="text-[#E5E2E3] text-ellipsis text-sm leading-5 tracking-[0.28px] font-semibold pr-6.75 pt-1 pl-3.5 text-nowrap my-1 w-30 truncate">{name}</p>
          <p className="text-off-white text-xs font-medium leading-3.5 tracking-[0.6px] w-30 truncate">{character}</p>
        </span>
      )
    })
    return spans;
  }

  function contentInfo(): React.JSX.Element[] {
      let [year, month, day] = releaseDate(currentContent!);

      const data = {
        releaseDate: `${MONTHS[month-1]} ${day}, ${year}`,
        runtime: time() ? time() + " Minutes": currentContent?.seasons!.length + " Seasons",
        language: currentContent?.spoken_languages[0].english_name,
        budget: currentContent?.budget ? `${currentContent?.budget.toLocaleString("en", {style: "currency", currency: "USD", minimumFractionDigits: 0})}`: "Unknown"
      };

      /**Calendar - Clock - World - Money*/
      const svgs = [
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z" fill="#CBC3D7"/>
        </svg>,

        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" fill="#CBC3D7"/>
        </svg>,

        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0125 20C8.6375 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3625 0 9.9875C0 8.6125 0.2625 7.32083 0.7875 6.1125C1.3125 4.90417 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.6375 0 10.0125 0C11.3875 0 12.6792 0.2625 13.8875 0.7875C15.0958 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90417 19.2125 6.1125C19.7375 7.32083 20 8.6125 20 9.9875C20 11.3625 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0958 18.6875 13.8875 19.2125C12.6792 19.7375 11.3875 20 10.0125 20ZM10 17.95C10.4333 17.35 10.8083 16.725 11.125 16.075C11.4417 15.425 11.7 14.7333 11.9 14H8.1C8.3 14.7333 8.55833 15.425 8.875 16.075C9.19167 16.725 9.56667 17.35 10 17.95ZM7.4 17.55C7.1 17 6.8375 16.4292 6.6125 15.8375C6.3875 15.2458 6.2 14.6333 6.05 14H3.1C3.58333 14.8333 4.1875 15.5583 4.9125 16.175C5.6375 16.7917 6.46667 17.25 7.4 17.55ZM12.6 17.55C13.5333 17.25 14.3625 16.7917 15.0875 16.175C15.8125 15.5583 16.4167 14.8333 16.9 14H13.95C13.8 14.6333 13.6125 15.2458 13.3875 15.8375C13.1625 16.4292 12.9 17 12.6 17.55ZM2.25 12H5.65C5.6 11.6667 5.5625 11.3375 5.5375 11.0125C5.5125 10.6875 5.5 10.35 5.5 10C5.5 9.65 5.5125 9.3125 5.5375 8.9875C5.5625 8.6625 5.6 8.33333 5.65 8H2.25C2.16667 8.33333 2.10417 8.6625 2.0625 8.9875C2.02083 9.3125 2 9.65 2 10C2 10.35 2.02083 10.6875 2.0625 11.0125C2.10417 11.3375 2.16667 11.6667 2.25 12ZM7.65 12H12.35C12.4 11.6667 12.4375 11.3375 12.4625 11.0125C12.4875 10.6875 12.5 10.35 12.5 10C12.5 9.65 12.4875 9.3125 12.4625 8.9875C12.4375 8.6625 12.4 8.33333 12.35 8H7.65C7.6 8.33333 7.5625 8.6625 7.5375 8.9875C7.5125 9.3125 7.5 9.65 7.5 10C7.5 10.35 7.5125 10.6875 7.5375 11.0125C7.5625 11.3375 7.6 11.6667 7.65 12ZM14.35 12H17.75C17.8333 11.6667 17.8958 11.3375 17.9375 11.0125C17.9792 10.6875 18 10.35 18 10C18 9.65 17.9792 9.3125 17.9375 8.9875C17.8958 8.6625 17.8333 8.33333 17.75 8H14.35C14.4 8.33333 14.4375 8.6625 14.4625 8.9875C14.4875 9.3125 14.5 9.65 14.5 10C14.5 10.35 14.4875 10.6875 14.4625 11.0125C14.4375 11.3375 14.4 11.6667 14.35 12ZM13.95 6H16.9C16.4167 5.16667 15.8125 4.44167 15.0875 3.825C14.3625 3.20833 13.5333 2.75 12.6 2.45C12.9 3 13.1625 3.57083 13.3875 4.1625C13.6125 4.75417 13.8 5.36667 13.95 6ZM8.1 6H11.9C11.7 5.26667 11.4417 4.575 11.125 3.925C10.8083 3.275 10.4333 2.65 10 2.05C9.56667 2.65 9.19167 3.275 8.875 3.925C8.55833 4.575 8.3 5.26667 8.1 6ZM3.1 6H6.05C6.2 5.36667 6.3875 4.75417 6.6125 4.1625C6.8375 3.57083 7.1 3 7.4 2.45C6.46667 2.75 5.6375 3.20833 4.9125 3.825C4.1875 4.44167 3.58333 5.16667 3.1 6Z" fill="#CBC3D7"/>
        </svg>,



        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16Z" fill="#CBC3D7"/>
        </svg>
      ]

      let spans: React.JSX.Element[] = [];
      spans = svgs.map((svg, i) => {
        let boxTitles = Object.keys(data);
        let boxValues = Object.values(data); 
        return (
          <span key={i} className="p-4 text-start rounded-xl inset-ring-1 inset-ring-[#ffffff01] bg-[#1C1B1C]">

            <div>
              {svg}
              
            </div>



            <p className="text-xs leading-3.5 tracking-[0.6px] text-off-white font-medium my-1">{boxTitles[i] != "releaseDate" ? boxTitles[i].toUpperCase() : "RELEASE DATE"}</p>

            <p className="text-[#E5E2E3] leading-5 tracking-[0.28px] font-semibold text-sm">{boxValues[i]}</p>
          </span>
        )
      })

      return spans
  }

  function getSimilarContent(): React.JSX.Element[] {
    let spans: React.JSX.Element[] | undefined = [];
    similarContent?.results?.forEach((content) => {
      spans.push(<SimilarContent posterPath={showImage(content.poster_path)} title={content.title ?? content.title ?? content.name ??"unknown" } yearReleased={releaseDate(content)[0] }/>)
    })

    return spans
  }



  if (!currentContent) {
    // Loading page component
    return (<h1 className="text-white">Loadding ...</h1>)
  }

  return (
    <>
      <article className="overlay relative h-[40vh]">
        <img className="h-full w-full object-cover" src={showImage(currentContent!.backdrop_path)} alt={getTitle()} />

        {/* toolbar */}
        {<Toolbar />}

        {/* Movie Details */}
        <section className="flex items-end gap-4 absolute z-10 left-4 bottom-0 translate-y-2/10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] bg-transparent">
          <span className="w-30 border-6 border-off-white outline-1 outline-black rounded-lg ">
            <img className="w-full" src={showImage(currentContent!.poster_path)} alt={getTitle()} />
          </span>

          <span className="pb-4">
            <h3 className="text-white leading-6 drop-shadow-[0_2px_2px_rgpa(0,0,0,0.06),0_4px_3px_rgpa(0,0,0,0.07)] mb-1">{getTitle()}</h3>

            <div className="flex items-center gap-2 text-off-white text-xs font-medium">
              <p className="leading-[14.4px] tracking-[0.6px]">{releaseDate(currentContent)[0]}</p>
              <span>•</span>

              <div className="flex items-center">
                <div className="pr-1"> {/* SVG */}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z" fill="#FFB95F"/>
                  </svg>

                </div>
                <p className="text-[#ffb95f] text-bold -translate-y-px">{rating()}</p>
              </div>
              {isMovie && <span>•</span>}

              {isMovie && <p className="leading-[14.4px] tracking-[0.6px]">{time()}m</p>}
            </div>
          </span>
        </section>
      </article>

      <article className="container sm:ml-[50%] sm:-translate-x-1/2 text-center flex flex-col gap-12 w-full">

        {/* Buttons */}
        <section className="mt-19.5 flex w-full gap-4 justify-center">
          <button className="flex h-11 w-43 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-200 py-3">

              <div> {/* SVG Container */}
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 14V0L11 7L0 14Z" fill="#23005C"/>
                </svg>

              </div>
              <p className="text-sm leading-[19.6px] font-semibold tracking-[0.28px] text-[#23005C]">View Details</p>

          </button>

          <button className="flex h-11 w-43 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2A2A2B] py-3 inset-ring-1 inset-ring-[#ffffff1a]">

            <div> {/* SVG Container */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 6.66667H0V5H5V0H6.66667V5H11.6667V6.66667H6.66667V11.6667H5V6.66667Z" fill="#D0BCFF"/>
              </svg>


            </div>
            <p className="text-sm leading-[19.6px] font-semibold tracking-[0.28px] text-primary-200">Watchlist</p>

          </button>
        </section>

        {/* Genres */}
        <section className="flex items-center gap-1">
          {genresDisplay()}
        </section>

        {/* Overview */}
        <About title="Overview" paragraph={currentContent!.overview} />

        {/* Cast */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl leading-7.5 font-semibold text-[#E5E2E3]">Cast</h3>
            <button className="cursor-pointer pr-4 text-xs leading-3.5 font-medium tracking-[0.6px] text-primary-200">See All</button>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none">
            {castDisplay()}
          </div>
        </section>

        {/* Information */}
        <section className="grid grid-cols-2 gap-2">
          {contentInfo()}
        </section>

        {/* More Info */}
        <section className="bg-[#1C1B1C] text-start space-y-4 p-4 rounded-xl">
          <div className="border-b border-[#353436] pb-2.25">

            <p className="text-off-white font-medium text-xs leading-3.5 tracking-[0.6px]">Director</p>

            <p className="font-semibold text-sm leading-5 tracking-[0.28px] text-[#E5E2E3]">{castAndCrew?.crew?.find((crew) => crew.job === "Director")?.name ?? "Not Set"}</p>

          </div>

          <div className="border-b border-[#353436] pb-2.25">

            <p className="text-off-white font-medium text-xs leading-3.5 tracking-[0.6px]">Producer</p>

            <p className="font-semibold text-sm leading-5 tracking-[0.28px] text-[#E5E2E3]">{castAndCrew?.crew?.find((crew) => crew.job === "Producer")?.name}</p>

          </div>
        </section>

        {/* Similar Content*/}
        <section className="flex overflow-x-auto gap-4">
          {getSimilarContent()}
        </section>
      </article>
    </>
  );
}
export default ContentDetails;
