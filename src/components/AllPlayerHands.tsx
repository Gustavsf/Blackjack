import { PlayerHand } from "./PlayerHand";
import * as React from 'react'

type PlayerScore = {first: number, second: number}
type HandResults = "Win" | "Lose" | "Push" | undefined;
type bets = {
  first: string,
  second: string,
  third: string
}
interface HandsProps{
    cards: string[][][],
    scores: PlayerScore[][],
    bets: number[][],
    results: string[][],
    activeHand: [number, number]
    emptySeats: bets | undefined
}
export const PlayerHands = (props: HandsProps) =>{
  let seatArr:boolean[] = []
  if(props.emptySeats?.first !== "0"){
    seatArr.push(true)
  } else {
    seatArr.push(false)
  }
  if(props.emptySeats?.second !== "0"){
    seatArr.push(true)
  } else {
    seatArr.push(false)
  }
  if(props.emptySeats?.third !== "0"){
    seatArr.push(true)
  } else {
    seatArr.push(false)
  }
  return(
    <div id='player-hands-div'>
    {props.cards.map((seat, s)=>{
      let a: boolean = false;
      let b: boolean = false;

      if(seatArr[s] === false){
        a = true
       if(seatArr[s+1] === false){
        b = true
       }
      }
        return(
          <>
          {a ? <div className="fake-sp"></div> : ""}
          {b ? <div className="fake-sp"></div> : ""}
          <div key={s} className='split-cards'>
            {seat.map((hands, h)=>{
              let num = s;
              let active: boolean = false;
              if(s === 0){
                if(a && b){
                  num=2
                }else if(a && !b){
                  num=1
                }else if(b && !a){
                  num=1
                }
              }
              if(seatArr[0] === true && seatArr[1] === true && seatArr[2] === false){
                if(num === props.activeHand[0] && props.activeHand[1] === h){
                  active = true;
                  }
              }else if((!a || a && !b || !a && b) && props.cards.length <=2){
                if(num+s === props.activeHand[0] && props.activeHand[1] === h){
                active = true;
                }
              } else{
                if(num === props.activeHand[0] && props.activeHand[1] === h){
                  active = true;
                  }
              }
              
              let res = undefined;
              if(props.results.length > 0){
                res = props.results[s][h] as HandResults
              }
              return(
                <>
                <div key={s+h} className='player-cards'>
                  <PlayerHand playerCards={hands} playerScore={props.scores[s][h]} playerBet={props.bets[s][h]} handNum={1} isActive={active} winState={res}/>
                </div>                
                </>)
              })}
          </div>
          </>
        )
    })}
  </div>
)
}