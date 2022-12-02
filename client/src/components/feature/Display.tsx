import YouTube, { YouTubeProps } from "react-youtube";
import { GiCancel } from "react-icons/gi";

//TODO add in prop of the youtube id which is passed in from the ListPage parent component

interface displayProps {
  displayActive: boolean;
  setDisplayActive: (arg0: boolean) => void;
}

const Display = ({ displayActive, setDisplayActive }: displayProps) => {
  const opts: YouTubeProps["opts"] = {
    height: "250",
    width: "320",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div className="absolute z-30 flex justify-center items-center h-full w-full">
      <div className="relative">
        <YouTube
          className="p-2 pt-5 border-solid border-2 rounded-xl bg-zinc-300"
          videoId="2g811Eo7K8U"
          opts={opts}
          onReady={onPlayerReady}
        />
        <GiCancel
          onClick={() => setDisplayActive(false)}
          className="absolute left-2 top-1 text-lg hover:cursor-pointer hover:bg-red-600 hover:text-zinc-100 rounded-lg transition-all"
        />
      </div>
    </div>
  );
};

export default Display;
