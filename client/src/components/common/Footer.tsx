import { Link } from "react-router-dom";
import UseUserContext from "../../contexts/UserContext";

//* Footer component that has the navigation
const Footer = () => {
  const { isLoggedIn, logoutUser } = UseUserContext();
  return (
    <div className="flex justify-between items-center p-4 pt-3">
      {isLoggedIn ? (
        <>
          <Link to="/">
            <button
              onClick={logoutUser}
              className="border-solid border-2 bg-zinc-200 rounded-lg w-[100px] h-[40px] hover:bg-zinc-300"
            >
              Sign Out
            </button>
          </Link>
          <Link to="/favourites">
            <button className="border-solid border-2 bg-zinc-200 rounded-lg w-[100px] h-[40px] hover:bg-zinc-300">
              Favourites
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/signin">
            <button className="border-solid border-2 bg-zinc-200 rounded-lg w-[100px] h-[40px] hover:bg-zinc-300">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="border-solid border-2 bg-zinc-200 rounded-lg w-[100px] h-[40px] hover:bg-zinc-300">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Footer;
