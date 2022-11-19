import Container from "../components/common/Container";
import { BsSuitHeartFill } from "react-icons/bs";

const Favourites = () => {
  // TODO add star react icon for rating

  // TODO add heart icon
  return (
    <Container>
      <h1 className="font-bold text-2xl text-center">Favourites</h1>
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between border-b-2">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <BsSuitHeartFill className="text-md hover:cursor-pointer hover:text-lg" />
              <h1 className="font-bold">Inception</h1>
              <p>2022</p>
            </div>
            <p className="text-sm">8 STAR</p>
            <p className="text-sm">PG rated</p>
          </div>

          <p>image</p>
        </li>
      </ul>
    </Container>
  );
};

export default Favourites;
