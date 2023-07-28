import { useMemo, useRef, useState, useCallback } from "react";


// function fib(n){
//     if(n===1 || n===2)
//     {
//         return 1
//     }
//     return fib(n-1)+fib(n-2)
// }

const Counter=(e)=>{
    console.log('render Counter')
    const [count,setCount] = useState(10)
    let num = useRef(0); // useRef does not re-render values, it just saves data amd does not reflect data like states
    //If count=>count+1 is commented then {num.current} does not show updated data even if num.current++ is happening because 
    //count state is not changed inside handleCounter() function. useRef is used to access DOM features

    const handleCounter=(e)=>{
        e.stopPropagation()
        setTimeout(() => {
            setCount(count=>count+1) //It goes into queue and useState does not resets data with each reloading of page with each click in app
        }, 2000);

        // numm++; It will not work as useRef is an object and num is also an object then and value is saved inside a property named current
        num.current++;
        console.log('Number of times Add is clicked',num.current)
        console.log('Previous count value : ',count) // console always shows data which is one step prior of setCount or count
    }
    
    //useCallback is used to memoised function
    const fibFx = useCallback(function fib(n){
            if(n===1 || n===2)
            {
                return 1
            }
            return fib(n-1)+fib(n-2)
        },[])

    //To save value of fib and all it's internal dependency needs to addressed
    //fib(count) will not be calculated with each click on screen as it is saved inside memo
    //useMemo(Calculation func, it's dependency decided by React itself)
    //const fibMemoised = useMemo(()=>fibFx(count),[count]) // When function fib(n) is written outside this function 1st method
    //useMemo is used to memoised the value of calculated function
    const fibMemoised = useMemo(()=>fibFx(count),[count,fibFx]) // When function fibFx is written inside this func 2nd method

    return(
        <>
        <h1 style={{color:'white'}}>{count} | {num.current} | {fibMemoised} </h1>
        <button onClick={handleCounter}>Add</button>
        </>
        
    )
}

export default Counter;