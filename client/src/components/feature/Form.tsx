import { useState } from "react";
import {
  genreData,
  entertainmentData,
  ratingData,
} from "../../utils/formOptions";
import { Link } from "react-router-dom";

//* Component for the form for user input
const Form = ({ criteria, setCriteria }: CriteriaState) => {
  const [keyword, setKeyword] = useState<string>("");

  const onSubmit = () => {
    setCriteria({
      genre: criteria.genre,
      typeEntertainment: criteria.typeEntertainment,
      rating: criteria.rating,
      title: keyword,
    });
  };

  return (
    <div className="border-solid w-full border-2 rounded-lg bg-zinc-100 p-2 m-1 shadow-lg min-h-[400px] max-w-xl">
      <h1 className="font-bold text-zinc-400 text-center">
        Input criteria here
      </h1>
      <form className="flex flex-col justify-around min-h-[400px] text-lg pb-5">
        <select
          defaultValue={"Genre"}
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
          <option value="Genre" disabled>
            Genre
          </option>
          {genreData.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          defaultValue={"Type entertainment"}
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
          <option value="Type entertainment" disabled>
            Type Entertainment
          </option>
          {entertainmentData.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          defaultValue={"Rating"}
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
          <option value="Rating" disabled>
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
          onClick={() => onSubmit()}
          to={"/list"}
          type="submit"
          className=" rounded-lg bg-zinc-200 hover:bg-zinc-300 h-[40px] transition-all items-center justify-center flex"
        >
          Search
        </Link>
      </form>
    </div>
  );
};

export default Form;
