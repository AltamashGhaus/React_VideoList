import Video from "./Video";
import PlayButton from "./PlayButton";
import { useCallback, useContext, useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import VideosContext from "../context/VideosContext";
import useVideos from "../hooks/Videos";
import axios from "axios";
import useVideoDispatch from "../hooks/VideoDispatch";
import moreVideos from '../data/moredata';

// function VideoList({videos,deleteVideo,editVideo}) {
// function VideoList({videos,dispatch,editVideo}) {
function VideoList({ editVideo }) {
  // const videos = useContext(VideosContext)
     const videos = useVideos();
  const dispatch = useVideoDispatch();

  //use to show the UI previous videos while making an update concurently without hanging the mouse cursor
   const deferredVideos = useDeferredValue(videos);
  const [isPending, startTransition] = useTransition();

  //const [videos, setVideos] = useState([]) -> This is a copy of videos useState in the App.js and it is a seperare useState, no link with the original videos
  //const [videos, setVideos] = useState([])
  // const url = "https://my.api.mockaroo.com/video.json?key=57427700";
  

  // async function handleClick() {
  //   const res = await axios.get(url);
  //   console.log("Get Videos", res.data);
  //   // setVideos(res.data)
  //   dispatch({ type: "LOAD", payload: res.data });
  // }

  async function handleClick() {

     dispatch({ type: "LOAD", payload: moreVideos });

    //startTransition is similar to deferredValue but many times videos can not be changed to differedVidoes, hence startTransition is used by 
    //enclosing the states inside it (states like-> setVideos). It does not allow the ui to hang while loading videos from back
    //startTransition only works with states
    
    // startTransition(()=>{
    //   setVideos(moreVideos)
    // })
    
  }

  //async can't be used at top level of useEffect, one needs to create a async function inside useEffect
  useEffect(() => {
    //  handleClick();

    //Uncomment this when url is allowed
    // async function getVideos() {
    //   const res = await axios.get(url);
    //   console.log("Get Videos", res.data);
    //   // setVideos(res.data)
    //   dispatch({ type: "LOAD", payload: res.data });
    // }
    // getVideos();
  }, []);

  //memoised function at the top as useCallback has to be called at the top
  const Play = useCallback(() => console.log("Playing.."), []);
  const Pause = useCallback(() => console.log("Paused.."), []);
  const memoButton = useMemo(() => (
    <PlayButton
      // onPlay={() => console.log('Playing..',video.title)}
      // onPause={() => console.log('Paused..',video.title)}
      onPlay={Play}
      onPause={Pause}
    >
     Play
    </PlayButton>
  ),[Play,Pause]);

  //To deferred means to mark this unimportant and makes the browser render its content at last after all processing, till then prev data is shown on screen
  return (
    <>
      {/* {videos.map((video) => ( */}
      {deferredVideos.map((video) => (
        <Video
          key={video.id}
          title={video.title}
          views={video.views}
          time={video.time}
          channel={video.channel}
          verified={video.verified}
          id={video.id}
          //deleteVideo={deleteVideo}
          editVideo={editVideo}
          // dispatch={dispatch} //Prop drilling happening here -> prop is not consumed here rather transferred to other js file
        >
          {/* <PlayButton
                        // onPlay={() => console.log('Playing..',video.title)}
                        // onPause={() => console.log('Paused..',video.title)}
                        onPlay={Play}
                        onPause={Pause}
                    >
                        {video.title}
                    </PlayButton> */}
                    {/* For implementing memoised on Play Button */}
                    {memoButton} 
        </Video>
      ))}
      {/* is pending is by default false and maintains whether page is loading or not */}
      <button onClick={handleClick}>{isPending ? 'Getting...' : 'Get Videos'}</button>
    </>
  );
}

export default VideoList;
