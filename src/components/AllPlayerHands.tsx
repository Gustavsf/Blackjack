import { PlayerHand } from "./PlayerHand";
import * as React from 'react'

type PlayerScore = {first: number, second: number}
type HandResults = "Win" | "Lose" | "Push" | undefined;

interface HandsProps{
    cards: string[][][],
    scores: PlayerScore[][],
    bets: number[][],
    results: string[][],
    activeHand: [number, number]
}


export const PlayerHands = (props: HandsProps) =>{

    return(
        <div id='player-hands-div'>
        {props.cards.map((seat, s)=>{
          return(
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
                <div key={s+h} className='player-cards'>
                  <PlayerHand playerCards={hands} playerScore={props.scores[s][h]} playerBet={props.bets[s][h]} handNum={1} isActive={active} winState={res}/>
                </div>
              )
            })}
          </div>)
        })}
      </div>
    )
}