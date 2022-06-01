import * as React from 'react'
type CardValue = {value: string};

export const Dealer = () =>  {
  const [dealerCards, setDealerCards] = React.useState<string[]>([])
  
  function addBetOnClick(){
    postMessage("addBetOnClick");
  }
 //get cards => add to state => render
 //same with score, bet
 //time between action probably
 //split add 4 grid positions, add hands accordingly

  const handleMessage = React.useCallback((event: MessageEvent) => {
    const full = event.data as string;
    let smth = full.split("-");
    switch (smth[0]) {
      case "dealDealer":
          document.getElementById("addBet-btn")?.removeEventListener('click', addBetOnClick)
          const parsed: CardValue[] = JSON.parse(smth[1])
          parsed.map((item)=>{
            const val = item.value as string
            setDealerCards(dealerCards => [...dealerCards, val])
          })
        break;
      case "finalDealerDealing":
          const parsed3: CardValue[] = JSON.parse(smth[1])
          setDealerCards([])
          parsed3.map((item)=>{
            let card = item.value as string;
            if(card !== "**"){
              setDealerCards(dealerCards => [...dealerCards, card ])
            }
          })
        break;
      case "gameResults":
        setDealerCards([])
        break;
      default:
        break;
  }
  }, []) 

  window.addEventListener('message', handleMessage);

  return (
    <>
      <div id="dealer-cards-div">
        {dealerCards.map(item=>{
          return <span key={item + Math.random()} style={{height:"100px", width:"100px"}}>{item}</span>
        })}
      </div>
    </>
  );
}

