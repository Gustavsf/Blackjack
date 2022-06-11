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
let once: boolean = true;

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
              let active: boolean = false;
              if(props.activeHand[0] === s && props.activeHand[1] === h){
                active = true;
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