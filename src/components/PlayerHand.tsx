import * as React from 'react'
import { Card } from "./Card";
type PlayerScore = {first: number, second: number}

interface Hand {
    playerCards: string[];
    playerScore: PlayerScore;
    playerBet: number;
    handNum: number;
    isActive: boolean;
    winState?: "Win" | "Lose" | "Push"
}

export const PlayerHand = (props: Hand) => {
    //@ts-ignore
    const tokenRef: React.RefObject<HTMLDivElement> = React.useRef();
    const id = "hand-" + props.handNum;
    let border: string = "";
    let shadow: string = "";
    let bgColor: string = "";
    

    if(props.isActive){
      shadow = "rgb(135, 255, 0) 0px 30px 100px -10px";
    }
    if(props.winState){
      if(props.winState === "Win"){
        border = "2px solid rgb(0, 255, 0)"
        if(tokenRef.current){
        const pos = tokenRef.current.getBoundingClientRect();
        const widthRatio = window.screen.width / pos.x;
        tokenRef.current.style.position = "absolute"
        let newspaperSpinning = [
          { transform: 'translate(0vw, 0vh) rotate(0deg) scale(1)' },
          { transform: 'translate(40vw, -70vh) rotate(360deg) scale(1.5)' }
        ];
        if(widthRatio > 10){
          //left
        } else if(widthRatio < 1.9){
          //right
          newspaperSpinning = [
            { transform: 'translate(0vw, 0vh) rotate(0deg) scale(1)' },
            { transform: 'translate(-40vw, -70vh) rotate(360deg) scale(1.5)' }
          ];
        }else {
          //mid
          newspaperSpinning = [
            { transform: 'translateY(0vh) rotate(0deg) scale(1)' },
            { transform: 'translateY(-50vh) rotate(360deg) scale(1.5)' }
          ];
        }
        const newspaperTiming = {
          duration: 2000,
          iterations: 1,
        }
        tokenRef.current.animate(newspaperSpinning, newspaperTiming);
        setTimeout(()=>{
          if(tokenRef.current)
          tokenRef.current.style.display = "none"
        }, 1800)
        }
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
    let playerSc = props.playerScore.first
    const score = () =>{
      if(props.playerScore.first > 21){
        if(props.playerCards.includes("AS")
        || props.playerCards.includes("AC")
        || props.playerCards.includes("AH")
        || props.playerCards.includes("AD")){
          playerSc = props.playerScore.first-10;
        }
      }
    }
    score();
    return(
        <div className="player-hand" style={{boxShadow: shadow, border: border}}>
          <p style={{fontSize:"32px", position:"absolute", color:"white", transform:"translateY(-70px)"}}>{props.winState}</p>
          <h2 className="hand-score">{playerSc}</h2>
          <div className="player-cards-div" id={id}>
            {props.playerCards.map(item=>{
              return Card(item);
            })}
          </div>
          <div className="tokens tokenHand" ref={tokenRef} style={{backgroundColor: bgColor}}><p>{props.playerBet}</p></div>
        </div>
    )
}