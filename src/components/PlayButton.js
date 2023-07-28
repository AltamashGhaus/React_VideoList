import ThemeContext from '../context/ThemeContext';
import './PlayButton.css';
import { useContext, useState, memo } from 'react';

const PlayButton = memo(function PlayButton({message,children,onPlay,onPause}){
    //let playing = false;  // don't use this approach;
    console.log('render PlayCount')
    const [playing,setPlaying] =  useState(false)
    const theme = useContext(ThemeContext)

    function handleClick(e){
        console.log(e)
        e.stopPropagation()
        //window.close();

        if(playing) onPause()
        else onPlay();

        setPlaying(!playing)
        console.log('Playing value : ',playing)
    }

    return (
        <button className={theme} onClick={handleClick}>{children} : {playing?'⏸':'⏵'}</button>
    )

})

export default PlayButton;