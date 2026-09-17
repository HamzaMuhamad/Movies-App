import { movieById, tvById, showImage, fetchCastAndCrew, fetchSimilarContent } from "../../util/API";
import type { iContent, iActedIn, iMutliContent, iMultiContentResult } from "../../util/API";
import { useEffect, useState } from "react";
import { SimilarContent } from "../../components/assets/ContentCard";
import "./content.css";



function Content({
  isMovie,
  id,
}: {
  isMovie: boolean;
  id: number;
}): React.JSX.Element {
  


  const [currentContent, setCurrentContent] = useState<iContent | undefined>();
  const [castAndCrew, setCastAndCrew] = useState<iActedIn | undefined>();
  const [similarContent, setSimilarContent] = useState<iMutliContent | undefined>();

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // const theContent = isMovie ?
  // movies : 
  // tvShows;
  
  
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

  function overview() {
    return currentContent?.overview
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

    console.log(similarContent)


  if (!currentContent) {
    // Loading page component
    return (<h1 className="text-white">Loadding ...</h1>)
  }

  return (
    <>
      <article className="overlay relative h-[40vh]">
        <img className="h-full w-full object-cover" src={showImage(currentContent!.backdrop_path)} alt={getTitle()} />

        {/* toolbar */}
        <section className="w-full h-16 justify-between items-center px-4 bg-[#131314cc] text-off-white absolute top-0 left-0 flex backdrop-blur-md z-10">
          <div className="p-2 rounded-md hover:bg-primary-100/10 duration-300 cursor-pointer"> {/* Left */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z" fill="#CBC3D7"/>
            </svg>

          </div>

          <div className="flex items-center gap-2"> {/* Right */}
            <span className="p-2 rounded-md hover:bg-primary-100/10 duration-300 cursor-pointer">
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18.35L8.55 17.05C6.86667 15.5333 5.475 14.225 4.375 13.125C3.275 12.025 2.4 11.0375 1.75 10.1625C1.1 9.2875 0.645833 8.48333 0.3875 7.75C0.129167 7.01667 0 6.26667 0 5.5C0 3.93333 0.525 2.625 1.575 1.575C2.625 0.525 3.93333 0 5.5 0C6.36667 0 7.19167 0.183333 7.975 0.55C8.75833 0.916667 9.43333 1.43333 10 2.1C10.5667 1.43333 11.2417 0.916667 12.025 0.55C12.8083 0.183333 13.6333 0 14.5 0C16.0667 0 17.375 0.525 18.425 1.575C19.475 2.625 20 3.93333 20 5.5C20 6.26667 19.8708 7.01667 19.6125 7.75C19.3542 8.48333 18.9 9.2875 18.25 10.1625C17.6 11.0375 16.725 12.025 15.625 13.125C14.525 14.225 13.1333 15.5333 11.45 17.05L10 18.35ZM10 15.65C11.6 14.2167 12.9167 12.9875 13.95 11.9625C14.9833 10.9375 15.8 10.0458 16.4 9.2875C17 8.52917 17.4167 7.85417 17.65 7.2625C17.8833 6.67083 18 6.08333 18 5.5C18 4.5 17.6667 3.66667 17 3C16.3333 2.33333 15.5 2 14.5 2C13.7167 2 12.9917 2.22083 12.325 2.6625C11.6583 3.10417 11.2 3.66667 10.95 4.35H9.05C8.8 3.66667 8.34167 3.10417 7.675 2.6625C7.00833 2.22083 6.28333 2 5.5 2C4.5 2 3.66667 2.33333 3 3C2.33333 3.66667 2 4.5 2 5.5C2 6.08333 2.11667 6.67083 2.35 7.2625C2.58333 7.85417 3 8.52917 3.6 9.2875C4.2 10.0458 5.01667 10.9375 6.05 11.9625C7.08333 12.9875 8.4 14.2167 10 15.65Z" fill="#CBC3D7"/>
              </svg>
            </span>

            <span className="p-2 rounded-md hover:bg-primary-100/10 duration-300 cursor-pointer">
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 20C14.1667 20 13.4583 19.7083 12.875 19.125C12.2917 18.5417 12 17.8333 12 17C12 16.9 12.025 16.6667 12.075 16.3L5.05 12.2C4.78333 12.45 4.475 12.6458 4.125 12.7875C3.775 12.9292 3.4 13 3 13C2.16667 13 1.45833 12.7083 0.875 12.125C0.291667 11.5417 0 10.8333 0 10C0 9.16667 0.291667 8.45833 0.875 7.875C1.45833 7.29167 2.16667 7 3 7C3.4 7 3.775 7.07083 4.125 7.2125C4.475 7.35417 4.78333 7.55 5.05 7.8L12.075 3.7C12.0417 3.58333 12.0208 3.47083 12.0125 3.3625C12.0042 3.25417 12 3.13333 12 3C12 2.16667 12.2917 1.45833 12.875 0.875C13.4583 0.291667 14.1667 0 15 0C15.8333 0 16.5417 0.291667 17.125 0.875C17.7083 1.45833 18 2.16667 18 3C18 3.83333 17.7083 4.54167 17.125 5.125C16.5417 5.70833 15.8333 6 15 6C14.6 6 14.225 5.92917 13.875 5.7875C13.525 5.64583 13.2167 5.45 12.95 5.2L5.925 9.3C5.95833 9.41667 5.97917 9.52917 5.9875 9.6375C5.99583 9.74583 6 9.86667 6 10C6 10.1333 5.99583 10.2542 5.9875 10.3625C5.97917 10.4708 5.95833 10.5833 5.925 10.7L12.95 14.8C13.2167 14.55 13.525 14.3542 13.875 14.2125C14.225 14.0708 14.6 14 15 14C15.8333 14 16.5417 14.2917 17.125 14.875C17.7083 15.4583 18 16.1667 18 17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20ZM15 18C15.2833 18 15.5208 17.9042 15.7125 17.7125C15.9042 17.5208 16 17.2833 16 17C16 16.7167 15.9042 16.4792 15.7125 16.2875C15.5208 16.0958 15.2833 16 15 16C14.7167 16 14.4792 16.0958 14.2875 16.2875C14.0958 16.4792 14 16.7167 14 17C14 17.2833 14.0958 17.5208 14.2875 17.7125C14.4792 17.9042 14.7167 18 15 18ZM3 11C3.28333 11 3.52083 10.9042 3.7125 10.7125C3.90417 10.5208 4 10.2833 4 10C4 9.71667 3.90417 9.47917 3.7125 9.2875C3.52083 9.09583 3.28333 9 3 9C2.71667 9 2.47917 9.09583 2.2875 9.2875C2.09583 9.47917 2 9.71667 2 10C2 10.2833 2.09583 10.5208 2.2875 10.7125C2.47917 10.9042 2.71667 11 3 11ZM15 4C15.2833 4 15.5208 3.90417 15.7125 3.7125C15.9042 3.52083 16 3.28333 16 3C16 2.71667 15.9042 2.47917 15.7125 2.2875C15.5208 2.09583 15.2833 2 15 2C14.7167 2 14.4792 2.09583 14.2875 2.2875C14.0958 2.47917 14 2.71667 14 3C14 3.28333 14.0958 3.52083 14.2875 3.7125C14.4792 3.90417 14.7167 4 15 4Z" fill="#CBC3D7"/>
              </svg>

            </span>
          </div>
        </section>

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
        <section className="text-start">
          <h3 className="mb-1 text-[#E5E2E3] font-semibold leading-7.75 text-2xl">Overview</h3>
          <p className="text-off-white leading-6.5">{overview()}</p>
        </section>

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
export default Content;
