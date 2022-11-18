import getData from "../hooks/IMDBAPI";
import { useEffect } from "react";

//! FIX THE ANYS
const ListPage = ({ criteria }: any) => {
  console.log(criteria);
  const makeAPICall = () => {
    getData(criteria);
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  {
    /* PUT IN A CANT USE COMONENET FOR IF USER IS LOGGED IN*/
  }

  return (
    <div>
      <h1>Entertainment List</h1>
    </div>
  );
};

export default ListPage;
