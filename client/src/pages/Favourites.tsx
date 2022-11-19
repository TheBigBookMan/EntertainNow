import Container from "../components/common/Container";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useFavouriteContext } from "../contexts/FavouritesContext";

const Favourites = () => {
  // TODO add star react icon for rating
  const { favourites, addFavourite, removeFavourite } = useFavouriteContext();

  return (
    <Container>
      <h1 className="font-bold text-2xl text-center">Favourites</h1>
      <p className="text-sm italic">
        Click the heart to remove from favourites
      </p>
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between border-b-2">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="font-bold text-zinc-400">Inception</h1>
              <p>2022</p>
              <BsSuitHeartFill className="text-md hover:cursor-pointer hover:text-lg" />
            </div>
            <p className="text-sm flex items-center">
              8 <AiFillStar className="text-lg" />
            </p>
            <p className="text-sm">PG rated</p>
          </div>
          <p>image</p>
        </li>
      </ul>
    </Container>
  );
};

export default Favourites;
