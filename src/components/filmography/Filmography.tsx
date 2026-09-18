import { releaseDate } from "../sharedFunctions";
import type { iKnownFor } from "../../util/API";

export default function Filmography({whereData, indx}: {whereData: iKnownFor[], indx: number}): React.JSX.Element {
  let left = releaseDate(whereData[indx])[0].toString();
  let midUp = whereData[indx]?.title ?? whereData[indx]?.name ?? "Unknown";
  let midDown = whereData[indx]?.character ?? "Unknown";
  let rate = whereData[indx] && Number(whereData[indx]?.vote_average.toFixed(1))

  return (
    <div className="p-4 flex items-center gap-4 rounded-xl bg-[#161618] border border-black">
      <span className="font-semibold text-sm text-off-white leading-5 tracking-[0.28px] w-10 text-center">{left}</span>

      <span className="flex-1">
        <p className="leading-5 tracking-[0.28px] font-semibold text-sm text-[#E5E2E3]">{midUp}</p>
        <p className="text-xs text-off-white font-medium leading-3.5 tracking-[0.6px]">{midDown}</p>
      </span>

      <span className="flex items-center gap-1 py-1 px-2 rounded-full bg-[#ffb95f1a]">
        <div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.23125 11.0833L3.17917 6.98542L0 4.22917L4.2 3.86458L5.83333 0L7.46667 3.86458L11.6667 4.22917L8.4875 6.98542L9.43542 11.0833L5.83333 8.91042L2.23125 11.0833Z" fill="#FFB95F"/>
          </svg>

        </div>
        <p className="text-xs text-[#FFB95F] font-medium leading-3.5 tracking-[0.6px]">{rate}</p>
      </span>
    </div>
  )
}



