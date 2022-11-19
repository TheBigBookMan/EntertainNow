import getData from "../hooks/IMDBAPI";
import { useEffect, useState } from "react";

interface MovieProps {
  image: string;
  title: string;
  description: string;
  imDbRating: string;
  contentRating: string;
  genres: string;
  stars: string;
  plot: string;
}

//! FIX THE ANYS
const ListPage = ({ criteria }: any) => {
  const [movieList, setMovieList] = useState<MovieProps[]>([]);
  /**
   * no params
   * returns nothing
   */

  //! change any
  const makeAPICall = async (): Promise<void> => {
    const response = await getData(criteria);
    console.log(response);
    setMovieList(response);
  };

  //! need to make variables reset to empty

  useEffect(() => {
    makeAPICall();
  }, []);

  {
    /* PUT IN A CANT USE COMONENET FOR IF USER IS LOGGED IN*/
  }

  // * info needed from fetch response (contentRating: G, Pg etc; description- year made; genres- string of genres; imDbRating- rating; image- poster image; plot- movie plt; stars- string of stars names; title- title)

  // TODO add in loading spinner
  if (movieList.length === 0) {
    return <div>Loading...</div>;
  }

  //TODO add in a star icon for rating as well
  return (
    <div className="border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-[580px]">
      <ul className="flex flex-col h-full overflow-y-scroll">
        <li className="flex flex-col items-center border-b-2 p-1 h-[550px] overflow-y-hidden">
          <img src={movieList[0].image} className="w-52" />
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-xl">{movieList[0].title}</h1>
            <p className="italic">{movieList[0].description}</p>
          </div>
          <div className="flex gap-5">
            <p>{movieList[0].imDbRating}</p>
            <p>{movieList[0].contentRating}</p>
          </div>
          <p className="text-sm italic">{movieList[0].genres}</p>
          <p className="text-sm">{movieList[0].stars}</p>
          <p>{movieList[0].plot}</p>
        </li>
      </ul>
    </div>
  );
};

export default ListPage;
