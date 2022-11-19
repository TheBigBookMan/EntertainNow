import getData from "../hooks/IMDBAPI";
import { useEffect, useState } from "react";

//! FIX THE ANYS
const ListPage = ({ criteria }: any) => {
  const [movieList, setMovieList] = useState<string[]>([]);
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

  // * info needed from fetch response (content-Rating: G, Pg etc; description- year made; genres- string of genres; imDbRating- rating; image- poster image; plot- movie plt; stars- string of stars names; title- title)

  // TODO add in loading spinner
  if (movieList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-[500px]">
      <ul className="flex flex-col h-[95%]">
        <li className="flex flex-col">
          <img />
          <h1>Inception</h1>
          <p>Rating</p>
          <p>Bio</p>
        </li>
      </ul>
    </div>
  );
};

export default ListPage;
