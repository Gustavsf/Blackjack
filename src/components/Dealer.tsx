import * as React from 'react'
import { Card } from "./Card";
type DealerScore = {first: number, second: number}

export const Dealer = () =>  {
  const [dealerCards, setDealerCards] = React.useState<string[]>([])
  const [dealerScore, setDealerScore] = React.useState<number>(0)

  const handleMessage = React.useCallback((event: MessageEvent) => {
    const full = event.data as string;
    let smth = full.split("-");
    switch (smth[0]) {
      case "dealDealer":
          const parsed: string[] = JSON.parse(smth[1])
          setDealerCards(parsed)
          const score: number = JSON.parse(smth[2]);
          setDealerScore(score);
        break;
      case "finalDealerDealing":
          const cards: string[] = JSON.parse(smth[1]);
          const filtered = cards.filter((e)=>{ return e !== "**" })
          setDealerCards(filtered);
          const score2: number = JSON.parse(smth[2]);
          setDealerScore(score2);
        break;
      case "cleanup":
        setDealerCards([])
        setDealerScore(0)
        break;
      default:
        break;
  }
  }, [])
  let otherScore: number = dealerScore 
  const score = () =>{
    if(dealerScore > 21){
      if(dealerCards.includes("AS")
      || dealerCards.includes("AC")
      || dealerCards.includes("AH")
      || dealerCards.includes("AD")){
        otherScore = dealerScore - 10;
      }
    }
  }
  score();
  window.addEventListener('message', handleMessage);

  return (
    <>
    <div id='dealer-hand'>
      <h2 id='dealer-score'>
        {dealerScore > 0 ? otherScore : ""}
      </h2>
      <div id="dealer-cards-div">
        {dealerCards.map(item=>{
          return Card(item)
        })}
      </div>
      <div id='card-stack'></div>
    </div>
    <div id='curved-div'></div>
    </>
  );
}

