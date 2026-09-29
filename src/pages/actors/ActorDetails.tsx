import {
  MONTHS,
  personById,
  showImage,
  moviesWorksURL,
  tvWorksURL,
} from "../../util/API";
import "./actor.css";
import ToolBar from "../../components/toolbar/Toolbar";
import About from "../../components/about/About";
import Loading from "../../components/loading/Loading";
import { ContentCard } from "../../components/assets/TrendingContentCard";
import Filmography from "../../components/filmography/Filmography";
import type { iPerson, iKnownFor } from "../../util/API";
import { useEffect, useState } from "react";

function Actor({ id }: { id: number }) {
  let [person, setPerson] = useState<iPerson | null>();

  // Related  --Start--
  let [content, setContent] = useState<iKnownFor[][]>([]);
  let allContent = content.flat();
  let movieContent = content[0];
  let tvContent = content[1];
  let filmographyAll = allContent?.filter(
    (content) => content.release_date || content.first_credit_air_date,
  );
  //
  let filmographyMovies = movieContent?.filter(
    (content) => content.release_date || content.first_credit_air_date,
  );
  //
  let filmographyTv = tvContent?.filter(
    (content) => content.release_date || content.first_credit_air_date,
  );
  // Related  --End--

  let [categoryFilmo, setCategoryFilmo] = useState("all");

  useEffect(() => {
    const startFetchingPerson = async () => {
      let result = await personById(id);
      setPerson(result);
    };

    startFetchingPerson();

    let startFetchingContent = async function () {
      let movies = await moviesWorksURL(id);
      let tvShows = await tvWorksURL(id);
      setContent(() => [movies, tvShows]);
    };

    startFetchingContent();
  }, []);

  function handleFilmography(event: React.MouseEvent<HTMLLabelElement>) {
    let allLabel = document.getElementById("showAll");
    let moviesLabel = document.getElementById("showMovies");
    let tvLabel = document.getElementById("showTv");

    if (event.currentTarget == allLabel) {
      setCategoryFilmo("all");
    } else if (event.currentTarget == moviesLabel) {
      setCategoryFilmo("movies");
    } else if (event.currentTarget == tvLabel) {
      setCategoryFilmo("tv");
    }
  }

  // Displaying Filmography Content
  function displayFilmography() {
    const filmoCards: React.JSX.Element[] = [];

    if (categoryFilmo == "movies") {
      filmographyMovies?.forEach((_, i) => {
        filmoCards.push(
          <Filmography key={i} whereData={filmographyMovies} indx={i} />,
        );
      });
    } else if (categoryFilmo == "tv") {
      filmographyTv?.forEach((_, i) => {
        filmoCards.push(
          <Filmography key={i} whereData={filmographyTv} indx={i} />,
        );
      });
    } else {
      filmographyAll?.forEach((_, i) => {
        filmoCards.push(
          <Filmography key={i} whereData={filmographyAll} indx={i} />,
        );
      });
    }
    return filmoCards;
  }

  function showKnownFor() {
    let knownFor: React.JSX.Element[] = [];
    allContent.sort((a, b) => b.popularity - a.popularity);
    allContent.forEach((specificContent) => {
      let posterPath = showImage(specificContent.poster_path);
      let rating = specificContent.vote_average;
      let title = specificContent.title ?? specificContent.name ?? "Unknown";
      let character = specificContent.character;
      knownFor.push(
        <ContentCard
          key={specificContent.id}
          movieImgUrl={posterPath}
          contentRate={rating}
          title={title}
          genreOrChar={character}
        />,
      );
    });

    return knownFor;
  }

  function actorInfo(): React.JSX.Element {
    const photoUrl = showImage(person?.profile_path ?? "/images/undefined.png");
    const name = person?.name ?? "Unknown";
    const birthDate = person?.birthday;
    const deathDate = person?.deathday;
    const placeOfBirth = person?.place_of_birth ?? "Unknown";

    function age() {
      let aged: number | string;
      if (birthDate) {
        if (deathDate) {
          aged =
            new Date(deathDate).getFullYear() -
            new Date(birthDate).getFullYear();
        } else {
          aged = new Date().getFullYear() - new Date(birthDate).getFullYear();
        }
      } else {
        aged = "Unknown";
      }

      return aged;
    }

    function birthDateFormated() {
      let formated: string | null = null;
      if (birthDate) {
        formated = `${MONTHS[new Date(birthDate).getMonth()]} ${new Date(birthDate).getDate()}, ${new Date(birthDate).getFullYear()}`;
        return formated;
      }
      return "Not Set";
    }

    return (
      <article className="relative overlay h-[50vh] flex items-end">
        <ToolBar />
        <img
          src={showImage(photoUrl)}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover "
        />

        <section className="relative z-10 p-4 space-y-1">
          <p className="text-primary-200 leading-3.5 tracking-[1.2px] font-medium text-xs">
            ACTOR
          </p>
          <h1 className="font-extrabold text-[40px] leading-12 tracking-[-0.8px] text-[#E5E2E3]">
            {name}
          </h1>

          <section className="space-y-1 pt-2">
            <div className="flex items-center gap-2">
              <div>
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.666667 13.3333C0.477778 13.3333 0.319444 13.2694 0.191667 13.1417C0.0638889 13.0139 0 12.8556 0 12.6667V9.33333C0 8.96667 0.130556 8.65278 0.391667 8.39167C0.652778 8.13056 0.966667 8 1.33333 8V5.33333C1.33333 4.96667 1.46389 4.65278 1.725 4.39167C1.98611 4.13056 2.3 4 2.66667 4H5.33333V3.03333C5.13333 2.9 4.97222 2.73889 4.85 2.55C4.72778 2.36111 4.66667 2.13333 4.66667 1.86667C4.66667 1.7 4.7 1.53611 4.76667 1.375C4.83333 1.21389 4.93333 1.06667 5.06667 0.933333L6 0L6.93333 0.933333C7.06667 1.06667 7.16667 1.21389 7.23333 1.375C7.3 1.53611 7.33333 1.7 7.33333 1.86667C7.33333 2.13333 7.27222 2.36111 7.15 2.55C7.02778 2.73889 6.86667 2.9 6.66667 3.03333V4H9.33333C9.7 4 10.0139 4.13056 10.275 4.39167C10.5361 4.65278 10.6667 4.96667 10.6667 5.33333V8C11.0333 8 11.3472 8.13056 11.6083 8.39167C11.8694 8.65278 12 8.96667 12 9.33333V12.6667C12 12.8556 11.9361 13.0139 11.8083 13.1417C11.6806 13.2694 11.5222 13.3333 11.3333 13.3333H0.666667ZM2.66667 8H9.33333V5.33333H2.66667V8ZM1.33333 12H10.6667V9.33333H1.33333V12ZM2.66667 8H9.33333H2.66667ZM1.33333 12H10.6667H1.33333ZM10.6667 8H1.33333H10.6667Z"
                    fill="#CBC3D7"
                  />
                </svg>
              </div>
              <p className="text-off-white leading-6">
                {birthDateFormated()} (Age {age()})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <svg
                  width="11"
                  height="14"
                  viewBox="0 0 11 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33333 6.66667C5.7 6.66667 6.01389 6.53611 6.275 6.275C6.53611 6.01389 6.66667 5.7 6.66667 5.33333C6.66667 4.96667 6.53611 4.65278 6.275 4.39167C6.01389 4.13056 5.7 4 5.33333 4C4.96667 4 4.65278 4.13056 4.39167 4.39167C4.13056 4.65278 4 4.96667 4 5.33333C4 5.7 4.13056 6.01389 4.39167 6.275C4.65278 6.53611 4.96667 6.66667 5.33333 6.66667ZM5.33333 11.5667C6.68889 10.3222 7.69444 9.19167 8.35 8.175C9.00556 7.15833 9.33333 6.25556 9.33333 5.46667C9.33333 4.25556 8.94722 3.26389 8.175 2.49167C7.40278 1.71944 6.45556 1.33333 5.33333 1.33333C4.21111 1.33333 3.26389 1.71944 2.49167 2.49167C1.71944 3.26389 1.33333 4.25556 1.33333 5.46667C1.33333 6.25556 1.66111 7.15833 2.31667 8.175C2.97222 9.19167 3.97778 10.3222 5.33333 11.5667ZM5.33333 13.3333C3.54444 11.8111 2.20833 10.3972 1.325 9.09167C0.441667 7.78611 0 6.57778 0 5.46667C0 3.8 0.536111 2.47222 1.60833 1.48333C2.68056 0.494444 3.92222 0 5.33333 0C6.74444 0 7.98611 0.494444 9.05833 1.48333C10.1306 2.47222 10.6667 3.8 10.6667 5.46667C10.6667 6.57778 10.225 7.78611 9.34167 9.09167C8.45833 10.3972 7.12222 11.8111 5.33333 13.3333Z"
                    fill="#CBC3D7"
                  />
                </svg>
              </div>
              <p className="text-off-white leading-6">{placeOfBirth}</p>
            </div>
          </section>
        </section>
      </article>
    );
  }

  // LOADING Comp.
  if (!person) {
    return <Loading />;
  }
  return (
    <section>
      {actorInfo()}

      <section className="container mx-auto mt-10">
        <About title="Biography" paragraph={person.biography} />
      </section>
      <section className="container mx-auto mt-10 flex gap-4 overflow-x-auto">
        {showKnownFor()}
      </section>

      <section className="pt-10 px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#E5E2E3] text-2xl leading-8 font-semibold">
            Filmography
          </p>
          <form action="" className="flex items-center gap-2">
            <label
              id="showAll"
              htmlFor="all"
              className="bg-[#1C1B1C] text-off-white py-1 px-3 font-medium text-xs leading-3.5 tracking-[0.6px] border border-[#ffffff0d] rounded-full cursor-pointer"
              onClick={handleFilmography}
            >
              All
              <input
                type="radio"
                name="category"
                id="all"
                className="hidden"
                defaultChecked
              />
            </label>

            <label
              id="showMovies"
              htmlFor="movies"
              className="bg-[#1C1B1C] text-off-white py-1 px-3 font-medium text-xs leading-3.5 tracking-[0.6px] border border-[#ffffff0d] rounded-full cursor-pointer"
              onClick={handleFilmography}
            >
              Movies
              <input
                type="radio"
                name="category"
                id="movies"
                className="hidden"
              />
            </label>

            <label
              id="showTv"
              htmlFor="tv"
              className="bg-[#1C1B1C] text-off-white py-1 px-3 font-medium text-xs leading-3.5 tracking-[0.6px] border border-[#ffffff0d] rounded-full cursor-pointer"
              onClick={handleFilmography}
            >
              Tv Shows
              <input type="radio" name="category" id="tv" className="hidden" />
            </label>
          </form>
        </div>

        <div className="space-y-2">{displayFilmography()}</div>
      </section>
    </section>
  );
}

export default Actor;
