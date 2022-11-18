import axios from "axios";

// ? imdb-api https://imdb-api.com/API/AdvancedSearch/k_q5dx85dn?title=Inception&user_rating=6,10&release_date=2010-01-01,2022-01-01&genres=Any

const getData = async (criteria: Criteria) => {
  try {
    if (criteria.genre === "") {
      criteria.genre = "Any";
    }

    if (criteria.typeEntertainment === "Movie") {
      criteria.typeEntertainment = "feature";
    } else if (criteria.typeEntertainment === "TV Series") {
      criteria.typeEntertainment = "tv_series";
    }

    const { data } = await axios.get(
      `https://imdb-api.com/API/AdvancedSearch/k_q5dx85dn?title=${criteria.title}&user_rating=${criteria.rating},10&title_type=${criteria.typeEntertainment}&genres=${criteria.genre}`
    );

    const listResponse = await data.results;

    console.log(listResponse);
  } catch (error) {
    console.log(error);
  }
};

export default getData;
