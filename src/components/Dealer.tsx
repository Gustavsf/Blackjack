import * as React from 'react'
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
          const cards: string[] = JSON.parse(smth[1])
          setDealerCards(cards)
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

  window.addEventListener('message', handleMessage);

  return (
    <>
    <h2 id='dealer-score'>
      {dealerScore > 0 ? dealerScore : ""}
    </h2>
    <div id="dealer-cards-div">
      {dealerCards.map(item=>{
        return <div className='cardD' key={item + Math.random()}>{item}</div>
      })}
    </div>
    <div id='curved-div'></div>
    </>
  );
}

