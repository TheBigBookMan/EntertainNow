import getData from "../hooks/IMDBAPI";
import { useEffect, useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
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
import Display from "../components/feature/Display";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO add in toastify for favourites added and removed

//* Component that shows the list of entertainment based on their criteria selected
const ListPage = ({ criteria, setCriteria }: CriteriaState) => {
  const nav = useNavigate();
  const [displayActive, setDisplayActive] = useState<boolean>(false);
  const [movieList, setMovieList] = useState<MovieProps[]>([]);
  //* If user adds a favourite then a refetch to get all favourites is made to update the showing list
  const [addFavourite, { error }] = useMutation(ADD_FAVOURITE, {
    refetchQueries: [{ query: GET_FAVOURITES }],
  });
  const [removeFavourite] = useMutation(REMOVE_FAVOURITE);
  const { data: UsersFavourites } = useQuery(GET_FAVOURITES);
  const { isLoggedIn } = useCtx();

  //* Calls the entertainment API with selected criteria
  const makeAPICall = async (): Promise<void> => {
    const response = await getData(criteria);
    setMovieList(response);
    setCriteria({
      genre: "",
      typeEntertainment: "",
      rating: 0,
      title: "",
    });
  };

  //* Call on load of page
  useEffect(() => {
    makeAPICall();
  }, []);

  //* Fetch the youtube url with parameters of title and year
  const fetchYoutube = async (title: string, year: string) => {
    const youtubeUrl = await getYoutube(title, year);
    return youtubeUrl;
  };

  //* Add to favourite function on click and saves in database
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
    await addFavourite({ variables });
    toastify("add");
    if (error) console.log(error);
  };

  //* Function to get the youtube ID which then redirects user to the youtube video on click
  const getYoutubeId = async (input: MovieProps) => {
    setDisplayActive(true);
    const youtubeUrl = await getYoutube(input.title, input.description);
    nav(`/list/display/${youtubeUrl}`);
  };

  //* Remove from favourites
  const removeFromFavourites = async (input: string) => {
    await removeFavourite({ variables: { image: input } });
    toastify("remove");
  };

  const toastify = (message: string): void => {
    if (message === "add") {
      toast.success("Added to favourites!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (message === "remove") {
      toast.success("Removed from favourites!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="relative">
      {displayActive && (
        <Routes>
          <Route
            path="/display/:youtubeId"
            element={
              <Display
                displayActive={displayActive}
                setDisplayActive={setDisplayActive}
              />
            }
          />
        </Routes>
      )}

      <Container displayActive={displayActive}>
        {movieList.length === 0 && (
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              margin: "auto",
            }}
            visible={true}
          />
        )}

        <ul
          className={`text-zinc-100 flex flex-col h-[748px] overflow-y-auto md:flex-row md:flex-wrap md:justify-around md:w-full scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-sky-600  scrollbar-thumb-rounded-md scrollbar-track-rounded-lg`}
        >
          {movieList.map((movie, index) => {
            return (
              <li
                key={movie.title + index}
                className="flex flex-col items-center mb-2 p-2 h-[550px] w-full md:w-[350px]"
              >
                <div
                  onClick={() => getYoutubeId(movie)}
                  className="group relative hover:cursor-pointer"
                >
                  <img
                    src={movie.image}
                    className="w-52 rounded-3xl relative group-hover:brightness-50 transition-all "
                  />
                  <AiFillPlayCircle className="text-zinc-100 flex p-2 gap-5 absolute top-0 left-0 h-0 w-full  justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 duration-500" />
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-xl">{movie.title}</h1>
                  <p className="italic">{movie.description}</p>
                  {isLoggedIn &&
                    (UsersFavourites?.favourites.some(
                      (fav: any) => fav.image === movie.image
                    ) ? (
                      <BsSuitHeartFill
                        className="hover:cursor-pointer hover:text-lg"
                        onClick={() => removeFromFavourites(movie.image)}
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
                <p className="overflow-y-auto">{movie.plot}</p>
              </li>
            );
          })}
        </ul>
      </Container>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ListPage;
