import { useEffect, useState } from "react";
import { personsPopular } from "../../util/API";
import type { iPersonPopularResults } from "../../util/API";
import ActorCard from "./ActorCard";

export default function Actors() {
  const [actorsData, setActorsData] = useState<iPersonPopularResults>();
  console.log(personsPopular)

  return (
    
    <section className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:sm:grid-cols-5 2xl:sm:grid-cols-6">
      {personsPopular.results.map(person => {
        return <ActorCard person={person} />
      })}
    </section>
  )
};


// useEffect(() => {

// }, []) 

