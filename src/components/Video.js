import { useContext, useEffect, memo, useId } from 'react';
import './Video.css';
import ThemeContext from '../context/ThemeContext';
import useVideoDispatch from '../hooks/VideoDispatch';

// function Video({title,id,channel="Coder Dost",views,time,verified,children,levels, deleteVideo,editVideo}) {
// function Video({title,id,channel="Coder Dost",views,time,verified,children,levels, dispatch,editVideo}) {

const Video = memo(function Video({title,id,channel="Coder Dost",views,time,verified,children,levels,editVideo}) {
  console.log('render Video')
const theme = useContext(ThemeContext)  
console.log('Videosssss',{theme})
// const dispatch = useContext(VideoDispatchContext)
const dispatch = useVideoDispatch()
const uid = useId();





//---------------------------------------------------useEffect 3 points--------------------
// useEffect(()=>{
//   // //1st -> Callback in useEffect
//   const idx = setInterval(()=>{
//     console.log('Video Playing : ', id)
//   }, 3000)

//   //3rd --> clearInterval of useEffect
//   return ()=>{
//     //API call can be made, listeners, webSocket can be used
//     clearInterval(idx)
//   }
// },[id]) //2nd --> Dependency of useEffect if id is changed useEffect will run 
//---------------------------------------------------useEffect 3 points--------------------

  return (
      <>
      <div id={uid} className={`container ${theme}`} onClick={()=>levels.push('Video')}>
      {/* <button className='close' onClick={(e)=>{e.stopPropagation(); deleteVideo(id);}} >X</button> */}
      <button className='close' onClick={(e)=>{e.stopPropagation(); dispatch({type:'DELETE',payload:id});}} >X</button>
      <button className='edit' onClick={(e)=>{e.stopPropagation(); editVideo(id);}} >Edit</button>
      <div className="pic">
      <img onClick={()=>levels.push('Image')} src={`https://picsum.photos/id/${id}/160/90`} alt="Katherine Johnson" />
      </div>
      <div className="title">{title}</div>
      <div className="channel">{channel} {verified && '✅'} </div>
      <div className="views">
        {views} views <span>.</span> {time}
      </div>
      <div>
        {children}
      </div>
      </div>
      </>
  );
})

export default Video;
