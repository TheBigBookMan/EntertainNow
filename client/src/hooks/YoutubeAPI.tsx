import axios from "axios";

// https://developers.google.com/youtube/v3

//`https://www.googleapis.com/youtube/v3/search?q=${titleCheck}%20${year}%20official%20trailer&key=AIzaSyADmSfBWFvQzs61upAmVe6_i-JemetTXY0`

//! above is the URL used in youtrailer, remember that having the words official trailer in the search made it more specific to get the actual trailer for the one clicked, may need to add the description year of the movie in the search as well for more specifics

//* the %20 is needed as space so create algorithm to replace spaces in the search with the percentages20

// TODO create an interface with the youtubecrtiera type
const getYoutube = async (title: string, year: string) => {
  try {
    console.log(title);
    if (title.split(" ").length > 1) {
      console.log("many words");
    } else {
      console.log("short");
    }

    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${title}%20${year}%20official%20trailer&key=AIzaSyADmSfBWFvQzs61upAmVe6_i-JemetTXY0`
    );

    const { videoId } = data.items[0].id;
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return youtubeUrl;
  } catch (error) {
    console.log(error);
  }
};

export default getYoutube;
