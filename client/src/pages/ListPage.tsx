import getData from "../hooks/IMDBAPI";
import { useEffect } from "react";

//! FIX THE ANYS
const ListPage = ({ criteria }: any) => {
  console.log(criteria);
  const makeAPICall = () => {
    getData(criteria);
  };

  //! need to make variables reset to empty

  useEffect(() => {
    makeAPICall();
  }, []);

  {
    /* PUT IN A CANT USE COMONENET FOR IF USER IS LOGGED IN*/
  }

  return (
    <div className="border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-[500px]">
      <ul className="flex flex-col h-[95%]">
        <li className="flex flex-col">
          <img />
          <h1>Inception</h1>
          <p>Rating</p>
          <p>Bio</p>
        </li>
      </ul>
    </div>
  );
};

export default ListPage;
