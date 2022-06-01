import * as React from 'react'
import { CardType } from '../domain/Card';
type CardValue = {value: string};

export const Player = () =>  {
  //make into one state
  const [playerCards, setPlayerCards] = React.useState<string[]>([])
  const [playerCards2, setPlayerCards2] = React.useState<string[]>([])
  const [playerCards3, setPlayerCards3] = React.useState<string[]>([])
  const [playerCards4, setPlayerCards4] = React.useState<string[]>([])

  function addCardOnClick() {
    postMessage("addCardOnClick");
    postMessage("playerAction");
  }
  function splitOnClick() {
    postMessage("splitOnClick");
    postMessage("playerAction");
  }
  function addBetOnClick(){
    postMessage("addBetOnClick");
  }
  function doubleOnClick(){
    postMessage("doubleOnClick");
    postMessage("playerAction");
  }
  function stayOnClick(){
    postMessage("stayOnClick");
    postMessage("playerAction");
  }
  function addEventListeners(){
    document.getElementById("hit-btn")?.addEventListener('click', addCardOnClick)
    document.getElementById("split-btn")?.addEventListener('click', splitOnClick)
    document.getElementById("double-btn")?.addEventListener('click', doubleOnClick)
    document.getElementById("stay-btn")?.addEventListener('click', stayOnClick)
  }
  function removeListeners(){
    document.getElementById("hit-btn")?.removeEventListener('click', addCardOnClick)
    document.getElementById("split-btn")?.removeEventListener('click', splitOnClick)
    document.getElementById("double-btn")?.removeEventListener('click', doubleOnClick)
    document.getElementById("stay-btn")?.removeEventListener('click', stayOnClick)
  }
 //get cards => add to state => render
 //same with score, bet
 //time between action probably
 //split add 4 grid positions, add hands accordingly

  const handleMessage = React.useCallback((event: MessageEvent) => {
    const full = event.data as string;
    let smth = full.split("-");
    switch (smth[0]) {
      case "addBets":
          document.getElementById("addBet-btn")?.addEventListener('click', addBetOnClick)
        break;
      case "dealDealer":
          document.getElementById("addBet-btn")?.removeEventListener('click', addBetOnClick)
        break;
      case "dealPlayer":
          addEventListeners();
          const parsed2: CardValue[][] = JSON.parse(smth[1])
          parsed2.map((items) => items.map((item)=>{
            const val = item.value as string
            console.log(val)
            setPlayerCards(playerCards => [...playerCards, val])
          }))
        break;
      case "addPlayerCard":
          //add hand id into request
          console.log(smth[2])
          if(smth[2] === "first"){
            setPlayerCards(playerCards => [...playerCards, smth[1]])
          } else if (smth[2] === "second") {
            setPlayerCards2(playerCards => [...playerCards, smth[1]])
          } else if (smth[2] === "third") {
            setPlayerCards3(playerCards => [...playerCards, smth[1]])
          } else if (smth[2] === "fourth") {
            setPlayerCards4(playerCards => [...playerCards, smth[1]])
          }
        break;
      case "splitPlayerCards":
          setPlayerCards([]);
          setPlayerCards2([]);
          setPlayerCards3([]);
          setPlayerCards4([]);

          const cardArr: CardValue[][] = JSON.parse(smth[1]);
          cardArr.map((items, i) => items.map((item)=>{
            const val = item.value as string
            if(i === 0){
              setPlayerCards(playerCards => [...playerCards, val])
            }
            if(i === 1){
              setPlayerCards2(playerCards => [...playerCards, val])        
            }
            if(i === 2){
              setPlayerCards3(playerCards => [...playerCards, val])      
            }
            if(i === 3){
              setPlayerCards4(playerCards => [...playerCards, val])
            }
          }))
        break;
      case "finalDealerDealing":
          removeListeners();
        break;
      case "gameResults":
          setPlayerCards([]);
          setPlayerCards2([]);
          setPlayerCards3([]);
          setPlayerCards4([]);
        break;
      default:
        break;
  }
  }, []) 

  window.addEventListener('message', handleMessage);
  //in one div probably better, so could use grid layot, responsive easier
  return (
    <>
      <div id="dealer-cards-div">
        {playerCards.map(item=>{
          return <span key={item + Math.random()} style={{height:"100px", width:"100px"}}>{item}</span>
        })}
      </div>
      <div id="dealer-cards-div">
        {playerCards2.map(item=>{
          return <span key={item + Math.random()} style={{height:"100px", width:"100px"}}>{item}</span>
        })}
      </div>
      <div id="dealer-cards-div">
        {playerCards3.map(item=>{
          return <span key={item + Math.random()} style={{height:"100px", width:"100px"}}>{item}</span>
        })}
      </div>
      <div id="dealer-cards-div">
        {playerCards4.map(item=>{
          return <span key={item + Math.random()} style={{height:"100px", width:"100px"}}>{item}</span>
        })}
      </div>
      <button id="addBet-btn">Add bet</button>
      <button id="hit-btn">Hit</button>
      <button id="split-btn">Split</button>
      <button id="stay-btn">Stay</button>
      <button id="double-btn">Double</button>
    </>
  );
}

