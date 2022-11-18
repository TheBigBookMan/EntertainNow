import { useEffect, useState } from "react";
import getData from "../../hooks/IMDBAPI";
import {
  genreData,
  entertainmentData,
  ratingData,
} from "../../utils/formOptions";
import { Link } from "react-router-dom";

//TODO add Link from react-rtouer-dom for the onbutton submit which wil ltake to the list page and have loading spinner while list loads

//TODO put option list into maps into the select options

const Form = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [criteria, setCriteria] = useState<Criteria>({
    genre: "",
    typeEntertainment: "",
    rating: 0,
    title: "",
  });
  const [call, setCall] = useState<boolean>(false);

  useEffect(() => {
    if (call) {
      makeAPICall();
    }
  }, [call]);

  //! fix up the e: type !!!!AVOID ANY!!!
  const onSubmit = (e: any) => {
    e.preventDefault();
    setCriteria({
      genre: criteria.genre,
      typeEntertainment: criteria.typeEntertainment,
      rating: criteria.rating,
      title: keyword,
    });
    setCall(true);
  };

  const makeAPICall = () => {
    getData(criteria);
  };

  return (
    <div className="border-solid border-2 rounded-lg p-2 shadow-lg h-full">
      <h1 className="font-bold text-zinc-400 text-center">
        Input criteria here
      </h1>
      <form className="flex flex-col justify-around h-full font-bold text-lg">
        <select
          className="border-solid border-2 border-zinc-200 rounded-lg h-[40px]"
          onChange={(e) =>
            setCriteria({
              genre: e.target.value,
              typeEntertainment: criteria.typeEntertainment,
              rating: criteria.rating,
              title: criteria.title,
            })
          }
        >
          <option value="" disabled selected hidden>
            Genre
          </option>
          {genreData.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="border-solid border-2 border-zinc-200 rounded-lg h-[40px]"
          onChange={(e) =>
            setCriteria({
              genre: criteria.genre,
              typeEntertainment: e.target.value,
              rating: criteria.rating,
              title: criteria.title,
            })
          }
        >
          <option value="" disabled selected hidden>
            Type Entertainment
          </option>
          {entertainmentData.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="border-solid border-2 border-zinc-200 rounded-lg h-[40px]"
          onChange={(e) =>
            setCriteria({
              genre: criteria.genre,
              typeEntertainment: criteria.typeEntertainment,
              rating: Number(e.target.value),
              title: criteria.title,
            })
          }
        >
          <option value="" disabled selected hidden>
            Rating
          </option>
          {ratingData.map((rating) => (
            <option value={rating} key={rating}>
              {rating}
            </option>
          ))}
        </select>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Title"
          className="border-solid border-2 rounded-lg pl-2"
        />
        <Link
          onClick={(e) => onSubmit(e)}
          to={"/list"}
          type="submit"
          className="border-solid border-black border-2 rounded-lg bg-zinc-200 hover:bg-zinc-400 h-[40px] transition-all items-center justify-center flex"
        >
          Search
        </Link>
      </form>
    </div>
  );
};

export default Form;
