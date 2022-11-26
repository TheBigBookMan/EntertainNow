import getData from "../hooks/IMDBAPI";
import { useEffect, useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Container from "../components/common/Container";
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import getYoutube from "../hooks/YoutubeAPI";

//! FIX THE ANYS
const ListPage = ({ criteria }: any) => {
  const [movieList, setMovieList] = useState<MovieProps[]>([]);
  const [addFavourite, { error }] = useMutation(ADD_FAVOURITE);

  // TODO have the add favourite and remove favourite mutation

  const makeAPICall = async (): Promise<void> => {
    const response = await getData(criteria);
    setMovieList(response);
  };

  //! need to make variables reset to empty

  useEffect(() => {
    makeAPICall();
  }, []);

  {
    /* PUT IN A CANT USE COMONENET FOR IF USER IS LOGGED IN*/
  }

  const fetchYoutube = async (title: string, year: string) => {
    const youtubeUrl = await getYoutube(title, year);
    return youtubeUrl;
  };

  const addToFavourite = async (input: MovieProps) => {
    const url = await fetchYoutube(input.title, input.description);
    console.log(url);
    // TODO get matching data for the favourite props from the input
    const { data } = await addFavourite();
    console.log(data);
  };

  // * info needed from fetch response (contentRating: G, Pg etc; description- year made; genres- string of genres; imDbRating- rating; image- poster image; plot- movie plt; stars- string of stars names; title- title)

  // TODO add in loading spinner
  if (movieList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ul className="flex flex-col h-full overflow-y-scroll">
        {movieList.map((movie, index) => {
          return (
            <li
              key={movie.title + index}
              className="flex flex-col items-center border-b-2 mb-2 p-1 h-[550px] "
            >
              <img src={movie.image} className="w-52 rounded-3xl" />
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl">{movie.title}</h1>
                <p className="italic">{movie.description}</p>
                <BsSuitHeart
                  onClick={() => addToFavourite(movie)}
                  className="hover:cursor-pointer hover:text-lg"
                />
              </div>
              <div className="flex gap-5">
                <p className="flex items-center">
                  {movie.imDbRating} <AiFillStar />
                </p>
                <p>{movie.contentRating}</p>
              </div>
              <p className="text-sm italic">{movie.genres}</p>
              <p className="text-sm">{movie.stars}</p>
              <p className="overflow-y-scroll">{movie.plot}</p>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default ListPage;
