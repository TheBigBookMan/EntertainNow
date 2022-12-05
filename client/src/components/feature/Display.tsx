import YouTube, { YouTubeProps } from "react-youtube";
import { GiCancel } from "react-icons/gi";
import { useParams, useNavigate } from "react-router-dom";

interface displayProps {
  displayActive: boolean;
  setDisplayActive: (arg0: boolean) => void;
}

//* Component that displays the youtube video widget
const Display = ({ setDisplayActive }: displayProps) => {
  const nav = useNavigate();
  let windowWidth;
  let windowHeight;

  if (window.innerWidth < 600) {
    windowWidth = 350;
    windowHeight = 280;
  } else if (window.innerWidth < 1000) {
    windowWidth = 560;
    windowHeight = 400;
  } else if (window.innerWidth >= 1000) {
    windowWidth = 900;
    windowHeight = 500;
  }

  let { youtubeId } = useParams();
  const opts: YouTubeProps["opts"] = {
    height: `${windowHeight}`,
    width: `${windowWidth}`,
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
          videoId={`${youtubeId}`}
          opts={opts}
          onReady={onPlayerReady}
        />
        <GiCancel
          onClick={() => {
            setDisplayActive(false);
            nav(-1);
          }}
          className="absolute left-2 top-1 text-lg hover:cursor-pointer hover:bg-red-600 hover:text-zinc-100 rounded-lg transition-all"
        />
      </div>
    </div>
  );
};

export default Display;
