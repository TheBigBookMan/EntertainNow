import axios from "axios";

// ? imdb-api https://imdb-api.com/API/AdvancedSearch/k_q5dx85dn?title=Inception&user_rating=6,10&release_date=2010-01-01,2022-01-01&genres=Any

const getData = async (criteria: Criteria) => {
  try {
    // TODO genre = comedy,horror,action -- need commas
    if (criteria.genre === "") {
      criteria.genre = "Any";
    }

    //TODO typeEntertainemt = title_type=feature,tv_series
    if (criteria.typeEntertainment === "Movie") {
      criteria.typeEntertainment = "feature";
    } else if (criteria.typeEntertainment === "TV Series") {
      criteria.typeEntertainment = "tv_series";
    }

    //TODO user rating will have to play around with the two nums in the url below, might ust mean 6 out of 10 or 6 to 10
    console.log(criteria);
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
