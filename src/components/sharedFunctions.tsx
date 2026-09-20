import type { iKnownFor } from "../util/API";


/**
 * [YEAR, MONTH, DAY] */
export function releaseDate (content: iKnownFor): number[] {
  let date = content?.release_date ?? content?.first_air_date ?? "unknown";  
  
  return date!.split('-').map((item) => +item);
};