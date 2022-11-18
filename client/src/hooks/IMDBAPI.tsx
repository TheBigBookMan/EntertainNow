import axios from "axios";

// ? imdb-api https://imdb-api.com/API/AdvancedSearch/k_q5dx85dn?title=Inception&user_rating=6,10&release_date=2010-01-01,2022-01-01&genres=Any

const getData = async (criteria: Criteria) => {
  try {
    console.log(criteria);
    const { data } = await axios.get(
      "https://imdb-api.com/API/AdvancedSearch/k_q5dx85dn?title=Inception&user_rating=6,10&release_date=2010-01-01,2022-01-01&genres=Any"
    );

    const listResponse = await data.results;

    console.log(listResponse);
  } catch (error) {
    console.log(error);
  }
};

export default getData;
