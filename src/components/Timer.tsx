import * as React from 'react'
interface TimerProps{
    seconds: number;
    display: "none" | "block";
}
export const Timer = (props:TimerProps) =>{
    return(
        <div id='timer-div' key={'timerdiv'} style={{display: props.display}}>
            {props.seconds > 0 ? <h1>{props.seconds}</h1> : ""}
        </div> 
    )
}