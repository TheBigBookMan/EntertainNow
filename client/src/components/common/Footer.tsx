import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  //!! HAVE TEMPORARY SIGN IN SIGN OUT CLICK SETSTATE
  return (
    <div className="flex justify-between items-center p-2 pt-3">
      {isLoggedIn ? (
        <>
          <Link to="/">
            <button
              onClick={() => setIsLoggedIn(false)}
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
            <button
              onClick={() => setIsLoggedIn(true)}
              className="border-solid border-2 bg-zinc-200 rounded-lg w-[100px] h-[40px] hover:bg-zinc-300"
            >
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
