
import { useEffect, useState } from "react";
import {useLoaderData, useSearchParams} from "react-router-dom";
import type {iMultiContentSearchResult, iMultiPersonSearchResult} from "../../util/API";
import ContentCard from "../content/ContentCard";
// import Actor from "../actors/ActorDetails";


export default function Search (): React.JSX.Element {

  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [movies, setMovies] = useState<React.JSX.Element[]>([]);
  const [tv, setTv] = useState<React.JSX.Element[]>([]);

  // const persons:React.JSX.Element[] = [];

  useEffect(() => {
    const moviesResults: React.JSX.Element[] = []
    const tvResults: React.JSX.Element[] = []
    // const personResults: React.JSX.Element[] = []
    data.results.forEach((item: iMultiContentSearchResult | iMultiPersonSearchResult) => {


      if (item.media_type === "movie" && "vote_average" in item) {
        moviesResults.push(<ContentCard key={item.id} theContent={item} />)
        
      } else if (item.media_type === "tv" && "vote_average" in item) {
        tvResults.push(<ContentCard key={item.id} theContent={item} />)
        
      } else {
        // persons.push(<Actor key={item.id} thePerson={item} />)
        console.log(item)
      }

    })
    setMovies(moviesResults)
    setTv(tvResults)
    // setTv(personResults)


  }, [data])

  return (
    <section className="text-white flex flex-wrap gap-4 px-4 pb-4">
      {movies.length > 0 && <h2 className="w-full text-4xl py-3 border-b-2 border-b-off-white mt-4 bg-[#ffffff1a] rounded-lg text-center uppercase font-black tracking-widest">Movies</h2>}
      {movies}
      {tv.length > 0 && <h2 className="w-full text-4xl py-3 border-b-2 border-b-off-white mt-4 bg-[#ffffff1a] rounded-lg text-center uppercase font-black tracking-widest">TV Shows</h2>}
      {tv}
      
    </section>
  )
}