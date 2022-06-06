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
    let border2: string = "";

    if(props.isActive){
      border = "5px dotted black"
    }
    if(props.winState){
      if(props.winState === "Win"){
        border2 = "5px solid green"
      } else if (props.winState === "Lose"){
        border2 = "5px solid red"
      } else if(props.winState === "Push"){
        border2 = "5px solid orange"
      }
    }
    return(
        <div className="player-hand" style={{borderBottom: border}}>
          <p style={{fontSize:"32px", margin:"0", color:"white"}}>{props.winState}</p>
          <div className="player-cards-div" id={id} style={{border: border2}}>
            {props.playerCards.map(item=>{
              return <span key={item + Math.random()} style={{height:"100px", width:"80px"}}>{item}</span>
            })}
          </div>
          <h2 className="hand-score">{props.playerScore}</h2>
          <div className="tokens">{props.playerBet}</div>
        </div>
    )
}