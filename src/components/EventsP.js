import { useState } from "react"

const EventsP=()=>{
    console.log('render EventP')
    const [over,setOver] = useState(false);

    const handleMouseOver=(e)=>{
        e.stopPropagation();
        setOver(true);
        console.log('handleMouseOver')
    }
    const handleMouseOut=()=>{
        setOver(false);
        console.log('handleMouseOut')
    }

    const blur = (e)=>{
        e.stopPropagation()
        console.log('out of the textbox')
     }

    const handleKeyDown=(e)=>{
        e.stopPropagation();
        setOver(true)
        console.log(e.target.value)
        if(e.keyCode===13)
        {
            console.log('Enter pressed')
        }
    }
    const handleKeyUp=(e)=>{
        e.stopPropagation()
        setOver(false)
        console.log('Key Up')
    }

    return (
        <div>
            <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={over?{transform:'rotate(50deg)'}:{}} src="https://picsum.photos/id/1/160/90" />
            <button>Send EventP</button>
            <input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onMouseDown={handleKeyDown} onBlur={blur} type="text" />
        </div>
    )
}
export default EventsP;
