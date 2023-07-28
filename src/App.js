  import './App.css';
  import videoDB from './data/data';
  import {useReducer, useState, useCallback, useRef, lazy, Suspense } from 'react';
  import AddVideo from './components/AddVideo';
  import VideoList from './components/VideoList';
  import ThemeContext from './context/ThemeContext';
  import VideosContext from './context/VideosContext';
  import VideoDispatchContext from './context/VideoDispatchContext';
  import Counter from './components/Counter';
  // import Dummy from './components/Dummy';


  //Suspense is used with lazy loading for not rendering the data on the first go, but rather when ui demands 
  //Deferred was used for state loading but suspend/lazy is used for component loading for the first time mounting
  const Dummy = lazy(()=>import('./components/Dummy.js'));

  function App() {
    console.log('render App')
    const levels = []
    const [editableVideos,setEditableVideos] = useState(null)
    const [mode,setMode] = useState('darkMode')
    const [show,setShow] = useState(false)

    function videoReducer(videos,action){
      switch(action.type){
        case 'LOAD':
          return action.payload;
        case 'ADD':
          return [...videos,
            {...action.payload, id: videos.length+1}
            ]
        case 'DELETE':
          return videos.filter(video=>video.id!==action.payload)
        case 'UPDATE':
          const index = videos.findIndex(v=>v.id===action.payload.id)
          //Splice directly changes the state (videos) and we know state must not be changed directly rather a clone/copy must be created
          //videos.splice(index,1,videos);
          const newVideos = [...videos] // Spread oeprator is used to create a clone of state (videos) 
          newVideos.splice(index,1,action.payload); // splice oeprator is used in new line as it is a non-emitter and does not update the cloned [...videos] in single statement
          setEditableVideos(null)
          return newVideos
        default :
          return videos
      }
    }

    // const [videos,dispatch] = useReducer(videoReducer,videoDB)
    const [videos,dispatch] = useReducer(videoReducer,[]) //videoDB is blanked because external API is used to get 10 videos using LOAD type reducer
    // const [videos,setVideos] = useState(videoDB)
    const inputReff = useRef(null)
    
    
    // function addVideos(video){
    //   dispatch({type:'ADD',payload:video})
    //   //action : 
    // //   setVideos([...videos,
    // //   {...video, id: videos.length+1}
    // // ])
    // }

    // function deleteVideo(id)
    // {
    //   dispatch({type:'DELETE',payload:id})
    //   // setVideos(videos.filter(video=>video.id!==id))
    // }

    const editVideo = useCallback(function editVideo(id)
    {
      //find,filter,map,splice are all higher order functions
      //console.log(videos.find(video=>video.id===id))
      setEditableVideos(videos.find(video=>video.id===id))
    },[videos])

    // function updateVideo(updatedvideo)
    // {
    //     // setVideos(newVideos)
    //     dispatch({type:'UPDATE',payload:updatedvideo})
    // }

    // const themeContext = useContext(ThemeContext);
    // console.log({mode})


    return (
      <>
      <ThemeContext.Provider value={mode}>
        <VideosContext.Provider value={videos}>
          <VideoDispatchContext.Provider value={dispatch}>
            <button onClick={()=>{inputReff.current.jumpTo()}}>Focus</button>
            <button onClick={()=>{setMode(mode==='darkMode'?'lightMode':'darkMode')}}>Mode</button>
            {/* <div className="App" onClick={()=>{levels.push('App'); console.log(levels.reverse().join('>')) }}> */}
              <div className= {`App ${mode}`} onClick={()=>{levels.push('App'); console.log(levels.reverse().join('>')) }}>
                {/* <Clock></Clock> */}
                <Counter></Counter>
                <div>Videos</div>

                {/* <AddVideo addVideos={addVideos} editableVideos={editableVideos} updateVideo={updateVideo}></AddVideo>
                <VideoList videos={videos} deleteVideo={deleteVideo} editVideo={editVideo}></VideoList> */}

                {/* <AddVideo dispatch={dispatch} editableVideos={editableVideos}></AddVideo> */}
                <AddVideo ref={inputReff} editableVideos={editableVideos}></AddVideo>
                {/* <VideoList videos={videos} dispatch={dispatch} editVideo={editVideo}></VideoList> */}
                <VideoList editVideo={editVideo}></VideoList>
                <button onClick={()=>{setShow(true)}}>Show Dummy</button>
                {
                  show ? 
                  <Suspense fallback={<>Loading.......</>}>
                    <Dummy/>
                  </Suspense> 
                    : null
                 
                 }

                {/* <Events></Events>
                <EventsP></EventsP> */}

                <div style={{ clear: 'both' }}>
                  {/* <PlayButton message="play-msg" onPlay={()=>console.log('Play')} onPause={()=>console.log('Pause')}>Play</PlayButton> */}

                  {/* <PlayButton message="pause-msg" onSmash={()=>alert('Playyy')}>Pause</PlayButton> */}
                </div>
            </div>
          </VideoDispatchContext.Provider>
        </VideosContext.Provider>
      </ThemeContext.Provider>
      </>
    );
  }

  export default App;
