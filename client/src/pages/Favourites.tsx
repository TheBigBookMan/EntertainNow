import Container from "../components/common/Container";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { REMOVE_FAVOURITE, GET_FAVOURITES } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const Favourites = () => {
  // TODO add star react icon for rating
  const [arrayOfFavs, setArrayOfFavs] = useState<FavouriteProps[]>([]);
  const { data: listOfFavourites, loading } = useQuery(GET_FAVOURITES);
  const [removeFavourite] = useMutation(REMOVE_FAVOURITE, {
    refetchQueries: [{ query: GET_FAVOURITES }],
  });

  useEffect(() => {
    let favList = listOfFavourites?.favourites;

    if (favList) {
      setArrayOfFavs(favList);
    }
  }, [listOfFavourites]);

  // TODO get favourites from graphql using query

  //!!! the favlist isnt being assigned before the map is getting created so need to figure out

  const removeFromFavourites = async (input: string) => {
    await removeFavourite({ variables: { image: input } });
  };

  if (arrayOfFavs.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <Container>
      <h1 className="font-bold text-2xl text-center">Favourites</h1>
      {arrayOfFavs.length === 0 ? (
        <div>You don't have any favourites, yet...</div>
      ) : (
        <div>
          <p className="text-sm italic">
            Click the heart to remove from favourites
          </p>
          <ul className="flex flex-col gap-2">
            {arrayOfFavs.map((movie: FavouriteProps) => (
              <li
                className="flex justify-between border-b-2"
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
                <img src={movie.image} className="w-20 rounded-2xl" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Favourites;
