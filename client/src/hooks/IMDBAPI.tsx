import axios from "axios";

//* Function to take in entertainment criteria and return the api data
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

    return listResponse;
  } catch (error) {
    console.log(error);
  }
};

export default getData;
