interface iContentCard {
  title: string;
  genreOrChar: string;
  contentRate: number;
  movieImgUrl: string;
}

function ContentCard({
  title,
  genreOrChar,
  contentRate,
  movieImgUrl,
}: iContentCard): React.JSX.Element {
  //? HERE: I will need `Id` my for click event to open the movie page ...
  return (
    <article className="relative min-w-35">
      <div className="mb-2 h-52.5 rounded-xl bg-[#181c1f] px-2 py-4 inset-ring-1 inset-ring-[#ffffff1a]">
        <img
          className="h-full w-full object-cover"
          src={movieImgUrl}
          alt={title}
        />
      </div>

      <section className=" absolute top-2 left-2 flex items-center gap-1 rounded-md bg-[rgba(19,19,20,.8)] px-2 py-1 backdrop-blur-sm">
        <span>
          <svg
            width="9"
            height="8"
            viewBox="0 0 9 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.59375 7.91667L2.27083 4.98958L0 3.02083L3 2.76042L4.16667 0L5.33333 2.76042L8.33333 3.02083L6.0625 4.98958L6.73958 7.91667L4.16667 6.36458L1.59375 7.91667Z"
              fill="#FFB95F"
            />
          </svg>
        </span>

        <span className="text-[10px] leading-4 text-[#E5E2E3]">
          {contentRate.toFixed(1)}
        </span>
      </section>

      <section>
        <h3 className="text-sm leading-5 font-semibold tracking-[0.28px] text-[#E5E2E3]">
          {title}
        </h3>
        <p className="text-[10px] leading-4 text-[#B4B1B9]">{genreOrChar}</p>
      </section>
    </article>
  );
}

function SimilarContent({posterPath, title, yearReleased}: {
  posterPath: string;
  title: string;
  yearReleased: number;}): React.JSX.Element {

  return (
  <article className="relative min-w-35 text-start">
    <div className="mb-2 h-52.5 rounded-xl bg-[#181c1f] px-2 py-4 inset-ring-1 inset-ring-[#ffffff1a]">
      <img
        className="h-full w-full object-cover"
        src={posterPath}
        alt={title}
      />
    </div>

    <section>
      <h3 className="text-sm leading-5 font-semibold tracking-[0.28px] text-[#E5E2E3]">
        {title}
      </h3>
      <p className="text-[10px] leading-4 text-[#B4B1B9]">{yearReleased}</p>
    </section>
  </article>
  );

};

export {ContentCard, SimilarContent};
