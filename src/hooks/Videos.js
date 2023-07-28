import { useContext, useDebugValue } from "react";
import VideosContext from "../context/VideosContext";

function useVideos(){

    //useDebugValue is only used with hooks
  //to know the length of videos displayed on screen inside Devtools-> Components-> click VideoList -> hooks -> Videos 110
  useDebugValue(useContext(VideosContext).length)   

  return useContext(VideosContext)

}
export default useVideos