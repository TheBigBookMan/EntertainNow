import Container from "../components/common/Container";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useFavouriteContext } from "../contexts/FavouritesContext";

const Favourites = () => {
  // TODO add star react icon for rating
  const { favourites, removeFavourite } = useFavouriteContext();

  //!!! need to figure out the map of favourites type--- NOT ANY!!

  return (
    <Container>
      <h1 className="font-bold text-2xl text-center">Favourites</h1>
      {favourites.length === 0 ? (
        <div>You don't have any favourites, yet...</div>
      ) : (
        <>
          <p className="text-sm italic">
            Click the heart to remove from favourites
          </p>
          <ul className="flex flex-col gap-2">
            {favourites.map((movie: MovieProps): any => {
              <li className="flex justify-between border-b-2">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 items-center">
                    <h1 className="font-bold text-zinc-400">{movie.title}</h1>
                    <p>{movie.description}</p>
                    <BsSuitHeartFill className="text-md hover:cursor-pointer hover:text-lg" />
                  </div>
                  <p className="text-sm flex items-center">
                    {movie.imDbRating} <AiFillStar className="text-lg" />
                  </p>
                  <p className="text-sm">{movie.contentRating} rated</p>
                </div>
                <img src={movie.image} className="w-20" />
              </li>;
            })}
          </ul>
        </>
      )}
    </Container>
  );
};

export default Favourites;
