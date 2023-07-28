import { useState } from "react"

const Events = ({ }) => {
   console.log('render Event')
     const [over, setOver] = useState(false);


    const handleMouseOver = (e)=>{
      e.stopPropagation()
       setOver(true) 
       console.log('handleMouseOver')
    }
    const handleMouseOut = (e)=>{
      e.stopPropagation()
        setOver(false) 
        console.log('handleMouseOut')
     }

     const focus = (e)=>{
        e.stopPropagation()
        console.log('focused on the textbox')
     }

     const blur = (e)=>{
        e.stopPropagation()
        console.log('out of the textbox')
     }

     const cut = (e)=>{
      e.stopPropagation()
        console.log(e.target.value)
     }
     const paste = (e)=>{
      e.stopPropagation()
        console.log(e.target.value)
     }

     const keyDown = (e)=>{
      e.stopPropagation()
        console.log(e)
        if(e.keyCode===13){
            console.log('Enter')

        }
     }

    return (
        <div style={{clear:'both'}}>
        <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={over ? {transform: 'rotate(15deg)'}: {}} src="https://picsum.photos/id/1/160/90"/>
        <button> Submit</button>
        <input onKeyDown={keyDown} onCut={cut}  onPaste={paste} onFocus={focus} onBlur={blur} type="text" name="" id="" />
        </div>
    )

}

export default Events;