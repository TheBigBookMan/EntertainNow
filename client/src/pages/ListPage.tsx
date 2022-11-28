import getData from "../hooks/IMDBAPI";
import { useEffect, useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import Container from "../components/common/Container";
import {
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  GET_FAVOURITES,
} from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import getYoutube from "../hooks/YoutubeAPI";
import useCtx from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

//! FIX THE ANYS
const ListPage = ({ criteria }: any) => {
  const [movieList, setMovieList] = useState<MovieProps[]>([]);
  const [addFavourite, { error, data: NewFavourite }] = useMutation(
    ADD_FAVOURITE,
    {
      refetchQueries: [{ query: GET_FAVOURITES }],
    }
  );
  const [removeFavourite] = useMutation(REMOVE_FAVOURITE);
  const { data: UsersFavourites } = useQuery(GET_FAVOURITES);
  const { isLoggedIn } = useCtx();

  // useEffect(() => {

  //   if (listOfFavourites) {
  //     // console.log(listOfFavourites);
  //   }
  // }, [UsersFavourites]);

  const makeAPICall = async (): Promise<void> => {
    const response = await getData(criteria);
    setMovieList(response);
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  const fetchYoutube = async (title: string, year: string) => {
    const youtubeUrl = await getYoutube(title, year);
    return youtubeUrl;
  };

  const addToFavourite = async (input: MovieProps) => {
    const url = await fetchYoutube(input.title, input.description);
    const variables = {
      title: input.title,
      description: input.description,
      imDbRating: input.imDbRating,
      contentRating: input.contentRating,
      image: input.image,
      youtube: url,
    };
    const { data } = await addFavourite({ variables });
    // console.log(data);
    if (error) console.log(error);
  };

  //TODO MAKE SURE THIS WORKS HAD TO DO WHILE THE API WAS FINISHED
  // ! dont think the ID coming from the click will be correct- must check
  // ? changed the resolver to take in the image as it is more unique an can be taken from the actual movielist array rather than the favourites array and then matched up in ther esolver to remove
  //! changed the favourite list from variable to the properties of the imported list
  const removeFromFavourites = async (input: string) => {
    await removeFavourite({ variables: { image: input } });
  };

  return (
    <Container>
      {movieList.length === 0 && (
        <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#9a9c9a"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            margin: "auto",
          }}
          visible={true}
        />
      )}
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
                {isLoggedIn &&
                  (UsersFavourites?.favourites.some(
                    (fav: any) => fav.image === movie.image
                  ) ? (
                    <BsSuitHeartFill
                      className="hover:cursor-pointer hover:text-lg"
                      onClick={() =>
                        removeFromFavourites(UsersFavourites?.favourites.image)
                      }
                    />
                  ) : (
                    <BsSuitHeart
                      onClick={() => addToFavourite(movie)}
                      className="hover:cursor-pointer hover:text-lg"
                    />
                  ))}
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
