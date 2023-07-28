import { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import './AddVideo.css'
import VideoDispatchContext from '../context/VideoDispatchContext'
import useVideoDispatch from '../hooks/VideoDispatch'

const initialState = {
    time: '1 month ago',
    channel: 'Coder Dost',
    verified: true,
    // For uncontrolled error -> Input to UI binding even if title/views changes then same must reflect on screen
    // Comtrolled is made to reset the input field after submit is clicked
    title:'',
    views:''
}

// const AddVideo=({addVideos, editableVideos, updateVideo})=>{
// const AddVideo=({dispatch, editableVideos})=>{
    //forwardRef is used to call ref={inputRef} from the parent js file
const AddVideo = forwardRef(function AddVideo({editableVideos}, inputReff){
   
    //It saves the input made by the user or anything present in the textbox of input fields
    const [video,setVideo] = useState(initialState);
    // const dispatch = useContext(VideoDispatchContext)
    const dispatch = useVideoDispatch()
    //It will be commented for forwardRef
     const inputRef = useRef(null); 
     const iRef = useRef(null);

     //useImperativeHandle is used to restrict the access to the parent js file where access of ref to focus etc 
     // was provided using forwardRef. It acts as a proxy and checks the func like jumpTo is present or not, allows only which are present
     useImperativeHandle(inputReff, ()=>{
            return {
                jumpTo(){
                   iRef.current.focus(); 
                }
            }
     }, [])

    function handleChange(e)
    { 
        console.log(e.target.name, e.target.value)
        setVideo({...video,
            [e.target.name] : e.target.value})
    
            // console.log(video)
    }

    function handleSubmit(e)
    {
        e.preventDefault()
        console.log('handleSubmit--->')
        //console.log(video)
        // addVideos(video) //But old videos are not present here i.e; ...videos so we create a func addVideos in App.js and passed the new Video to it.
        if(editableVideos)
        {
            // updateVideo(video)
            dispatch({type:'UPDATE',payload:video})
        }
        else{
            // addVideos(video) 
            dispatch({type:'ADD',payload:video})
        }
       
         setVideo(initialState)   // To make the input field blank after submit button is clicked
    }

    useEffect(()=>{
        if(editableVideos)
        setVideo(editableVideos)
        // inputRef.current.value="DEMO"
        // inputRef.current.focus()
        inputRef.current.placeholder = ""
        "Type Here".split('').forEach((char,index)=>{
            setTimeout(()=>{
                inputRef.current.placeholder = inputRef.current.placeholder + char
            },200*index)
        })
    },[editableVideos])

    return ( 
        <form> 

            {/* value={video.title} //this is for controlled input that is binding value from input to the UI, if title changes anywhere eles then same will be shown to UI*/}
            {/* ref={inputRef} -->ref is an inbuilt prop and it auromatically binds upper inputRef or any manually created refs in the DOM after which you can 
            use your manual refs i.e. inoutRef anywhere ex inside useEffect*/}
            {/* <input ref={inputRef} type="text" name="title" onChange={handleChange} placeholder="title" 
                value={video.title} />  */}
            <input ref={inputReff} type="text" name="title" onChange={handleChange} placeholder="title" 
                value={video.title} /> 
            <input ref={inputRef} type="text" name="views" onChange={handleChange} placeholder="views" 
                value={video.views} />
            <button onClick={handleSubmit}> {editableVideos?'Edit Video':'Add Video'} </button>
            <input ref={iRef} type="text" placeholder="For forwardRef using imperativeHandle"/>
            {/* <button onClick={()=>{
            setVideos([...videos,{ 
            id:videos.length+1,
            title: 'Demo JS tutorial',
            views: '1M',
            time: '1 month ago',
            channel: 'Coder Dost',
            verified: true
          }]);
        }}>Add Video</button> */}

        </form>
    )
})

export default AddVideo;