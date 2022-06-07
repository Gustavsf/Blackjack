import * as React from 'react'


interface Hand {
    playerCards: string[];
    playerScore: number;
    playerBet: number;
    handNum: number;
    isActive: boolean;
    winState?: "Win" | "Lose" | "Push"
}

export const PlayerHand = (props: Hand) => {
    const id = "hand-" + props.handNum;
    let border: string = "";
    let shadow: string = "";
    let bgColor: string = "";

    if(props.isActive){
      shadow = "rgb(135, 135, 0) 0px 30px 100px -10px";
    }
    if(props.winState){
      if(props.winState === "Win"){
        border = "2px solid rgb(0, 255, 0)"
      } else if (props.winState === "Lose"){
        border = "2px solid red"
      } else if(props.winState === "Push"){
        border = "2px solid orange"
      }
    }
    if(props.playerBet){
      if(props.playerBet === 10){
        bgColor = "orange"
      } else if(props.playerBet === 20){
        bgColor = "red"
      } else if(props.playerBet === 40){
        bgColor = "green"
      } else if(props.playerBet === 80){
        bgColor = "blue"
      } else if(props.playerBet === 100){
        bgColor = "black"
      } else {
        bgColor = "purple"
      }
    }

    return(
        <div className="player-hand" style={{boxShadow: shadow, border: border}}>
          <p style={{fontSize:"32px", position:"absolute", color:"white", transform:"translateY(-70px)"}}>{props.winState}</p>
          <h2 className="hand-score">{props.playerScore}</h2>
          <div className="player-cards-div" id={id}>
            {props.playerCards.map(item=>{
              //require(/images/2C.png) == 2C.15ebb3a4.png
              //import img from ...
              return <img className='cardD' key={item + Math.random()} src={"2C.15ebb3a4.png"}></img>
            })}
          </div>
          <div className="tokens tokenHand" style={{backgroundColor: bgColor}}><p>{props.playerBet}</p></div>
        </div>
    )
}