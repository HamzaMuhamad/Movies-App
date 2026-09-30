// import { useEffect, useState } from "react";
import { personsPopular } from "../../util/API";
// import type { iPersonPopularResults } from "../../util/API";
import ActorCard from "./ActorCard";

export default function Actors() {


  return (

    <>
      <h1 className="font-bold text-4xl mt-8 mb-3 px-4 text-off-white">Popular Actors</h1>
    
      <section className="p-4 pb-23 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:sm:grid-cols-5 2xl:sm:grid-cols-6">
        {personsPopular.results.map(person => {
          return <ActorCard key={person.id} person={person} />
        })}
      </section>
    </>
  )
};


// useEffect(() => {

// }, []) 

