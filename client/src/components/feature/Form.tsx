import { useEffect, useState } from "react";
import getData from "../../hooks/IMDBAPI";

// ? form info- search text, genre, rating, maybe look at what IMDB API has to offer

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
      <form className="flex flex-col gap-10 h-full">
        <select
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
        </select>

        <select
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
        </select>

        <select
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
        </select>

        {/* ADD IN SELECT FOR TV SHOW OR MOVIE */}

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Keyword"
          className="border-solid border-2 rounded-lg pl-2"
        />

        <button
          onClick={onSubmit}
          type="submit"
          className="border-solid border-black border-2 rounded-lg bg-zinc-200 hover:bg-zinc-400 h-[40px] transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Form;
