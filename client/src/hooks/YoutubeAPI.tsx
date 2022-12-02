import axios from "axios";

//* GET to the youtube API and returns a youtube ID to that specific trailer
const getYoutube = async (title: string, year: string) => {
  try {
    if (title.split(" ").length > 1) {
      title = title.replaceAll(" ", "%20");
    }

    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${title}%20${year}%20official%20trailer&key=AIzaSyADmSfBWFvQzs61upAmVe6_i-JemetTXY0`
    );

    const { videoId } = data.items[0].id;
    // const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return videoId;
  } catch (error) {
    console.log(error);
  }
};

export default getYoutube;
