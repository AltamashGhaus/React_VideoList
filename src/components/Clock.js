import { useEffect, useState } from "react";



const Clock =()=>{
    console.log('render Clock')
    const [startDate,setStartDate] = useState(new Date());
    const [date,setDate] = useState(new Date())
  

    useEffect(()=>{
     const id = setInterval(()=>{
        setDate(new Date())
    }, 1000)
    console.log(id)
    },[])

    const reset = ()=>{
        setStartDate(new Date());
    }

    return (
        <>
        <h1>Current Date : {date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds() }</h1>
        <h1>Time Spent : {Math.abs(Math.floor((date-startDate)/(1000*60*60))%60) +":"+ Math.abs(Math.floor((date-startDate)/(1000*60))%60) +":"+ Math.abs(Math.floor((date-startDate)/(1000))%60) }</h1>
        <button onClick={reset}>Reset</button>
        </>
        
    )

}

export default Clock;