import { useEffect, useState } from "react";
import {
  genreData,
  entertainmentData,
  ratingData,
} from "../../utils/formOptions";
import { Link } from "react-router-dom";

//! FIX THE ANY!!!
const Form = ({ criteria, setCriteria }: CriteriaState) => {
  const [keyword, setKeyword] = useState<string>("");

  //! fix up the e: type !!!!AVOID ANY!!!
  /**
   *
   * @param e takes in the event listener button
   * @returns nothing
   */
  const onSubmit = (e: any): void => {
    // e.preventDefault();
    setCriteria({
      genre: criteria.genre,
      typeEntertainment: criteria.typeEntertainment,
      rating: criteria.rating,
      title: keyword,
    });
  };

  return (
    <div className="border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-full">
      <h1 className="font-bold text-zinc-400 text-center">
        Input criteria here
      </h1>
      <form className="flex flex-col justify-around h-full text-lg">
        <select
          className="border-solid border-2 border-zinc-200 rounded-lg  font-bold h-[40px]"
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
          className="border-solid border-2 border-zinc-200 rounded-lg  font-bold h-[40px]"
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
          className="border-solid border-2 border-zinc-200 rounded-lg  font-bold h-[40px]"
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
          className=" rounded-lg bg-zinc-200 hover:bg-zinc-400 h-[40px] transition-all items-center justify-center flex"
        >
          Search
        </Link>
      </form>
    </div>
  );
};

export default Form;
