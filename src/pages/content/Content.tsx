

import { useState, useEffect } from "react";
import { movies, tvShows, showImage } from "../../util/API";
import type { iMultiContentResult } from "../../util/API";
import Loading from "../../components/loading/Loading"
import { useLoaderData } from "react-router-dom";


export default function Content() {
  const content = useLoaderData<iMultiContentResult[]>()

  /**
   * [YEAR, MONTH, DAY] */
  function releaseDate (content:iMultiContentResult  ): number[] {
    let date = content?.release_date ?? content?.first_air_date ?? "unknown";  
    
    return date!.split('-').map((item) => +item);
  };


  // Sorting by date
  if (content != undefined) {

    content?.sort((a, b) => new Date(releaseDate(b).toString()).getTime() - new Date(releaseDate(a).toString()).getTime())
  }




  function ContentCard({theContent}: {theContent: iMultiContentResult}) {

    let posterPath = showImage(theContent.poster_path);
    let title = theContent.title ?? theContent.name ?? "Unknown";
    let rate = theContent.vote_average.toFixed(1);

    return (
      <section className="rounded-lg bg-[#f0ebf4f0] overflow-hidden flex flex-col gap-3 pb-4 grow w-40 ">
        <div className="h-5/7 w-full overflow-hidden">
          <img src={posterPath} alt={title} className="w-full object-cover" />
        </div>

        <h3 className="font-medium text-[#131316] text-xl mx-4 line-clamp-2">{title}</h3>

        <div className="flex items-center gap-1 py-1 px-2 mx-4 rounded-full bg-[#221401b2] w-fit ">
          <div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z" fill="#FFB95F">
              </path>
            </svg>
          </div><p className="text-xs text-[#FFB95F] font-medium leading-3.5 tracking-[0.6px]">{rate}</p>
        </div>
      </section>
    )


  }


  function displayCards(): React.JSX.Element[] {
    let cards: React.JSX.Element[] = []
    content?.forEach((card) => {
      cards.push(<ContentCard key={card.id} theContent={card}/>)
    })
    return cards
  }

  if (content?.length == 0) {
    <Loading />

  }
  return(
    <section className="flex flex-wrap gap-2 p-4 pb-22">
      {displayCards()}
    </section>
  )
}