const Border = function({children}){
    console.log('render Border')

    return (<div style={{border:"3px solid white",display:"inline-block"}}>
          {children}
    </div>)
}

export default Border;