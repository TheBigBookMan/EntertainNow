import Container from "../components/common/Container";
import Display from "../components/feature/Display";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import { REMOVE_FAVOURITE, GET_FAVOURITES } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//* Component that shows the user a list of their favourites
const Favourites = () => {
  const nav = useNavigate();
  const [displayActive, setDisplayActive] = useState<boolean>(false);
  const [arrayOfFavs, setArrayOfFavs] = useState<FavouriteProps[]>([]);
  const { data: listOfFavourites } = useQuery(GET_FAVOURITES);
  //* User removes from favourite then refetch of the favourite data
  const [removeFavourite] = useMutation(REMOVE_FAVOURITE, {
    refetchQueries: [{ query: GET_FAVOURITES }],
  });

  useEffect(() => {
    let favList = listOfFavourites?.favourites;
    if (favList) {
      setArrayOfFavs(favList);
    }
  }, [listOfFavourites]);

  //* Remove favourite
  const removeFromFavourites = async (input: string) => {
    await removeFavourite({ variables: { image: input } });
  };

  //* Get the youtube ID from database and then navigate to that youtube video
  const getYoutubeId = async (input: FavouriteProps) => {
    setDisplayActive(true);
    nav(`/favourites/display/${input.youtube}`);
  };

  if (arrayOfFavs.length === 0) {
    return <div>Loading</div>;
  }

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
        <h1 className="font-bold text-2xl text-center">Favourites</h1>
        {arrayOfFavs.length === 0 ? (
          <div>You don't have any favourites, yet...</div>
        ) : (
          <div className="w-full">
            <p className="text-sm italic">
              Click the heart to remove from favourites, or click the image to
              view the trailer.
            </p>
            <ul className="flex flex-col gap-2 w-full">
              {arrayOfFavs.map((movie: FavouriteProps) => (
                <li
                  className="flex justify-between border-b-2 w-full"
                  key={movie.youtube}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center pr-2">
                      <h1 className="font-bold text-zinc-400">{movie.title}</h1>
                      <p>{movie.description}</p>
                      <BsSuitHeartFill
                        className="text-md hover:cursor-pointer hover:text-lg"
                        onClick={() => removeFromFavourites(movie.image)}
                      />
                    </div>
                    <p className="text-sm flex items-center">
                      {movie.imDbRating} <AiFillStar className="text-lg" />
                    </p>
                    <p className="text-sm">{movie.contentRating} rated</p>
                  </div>
                  <div className="group relative hover:cursor-pointer">
                    <img
                      src={movie.image}
                      className="w-24 rounded-2xl relative group-hover:brightness-50 transition-all"
                    />
                    <AiFillPlayCircle
                      onClick={() => getYoutubeId(movie)}
                      className="text-zinc-100 flex p-2 gap-5 absolute top-0 left-0 h-0 w-full  justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 duration-500"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Favourites;
