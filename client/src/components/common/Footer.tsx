import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between items-center p-2 pt-3">
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
    </div>
  );
};

export default Footer;
