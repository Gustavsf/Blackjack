import * as React from 'react'
import { PlayerHand } from "./PlayerHand"
type PlayerScore = {first: number, second: number}
type BetOverlay = "none" | "flex";
type ActionOverlay = "none" | "grid";
type HandResults = "Win" | "Lose" | "Push" | undefined;

export const Player = () =>  {
  const [cards, setCards] = React.useState<string[][]>([])
  const [scores, setScores] = React.useState<PlayerScore[]>([])
  const [bets, setBets] = React.useState<number[]>([])
  const [results, setResults] = React.useState<string[]>([])

  const [activeHand, setActiveHand] = React.useState<number | undefined>(0)
  const [addBetOverlay, setAddBetOverlay] = React.useState<BetOverlay>("none")
  const [actionOverlay, setActionOverlay] = React.useState<ActionOverlay>("none")
  const playerHandsRef: React.RefObject<HTMLDivElement> = React.createRef()

  const handleClick = React.useCallback((arg: string) => {
    switch (arg) {
      case "hit":
          postMessage("addCardOnClick");
          postMessage("playerAction");
        break;
      case "split":
          postMessage("splitOnClick");
          postMessage("playerAction");
        break;
      case "double":
          postMessage("doubleOnClick");
          postMessage("playerAction");
        break;
      case "stay":
          postMessage("stayOnClick");
          postMessage("playerAction");
        break;
      default:
        if(["10","20","40","80","100"].includes(arg)){
          postMessage("addBetOnClick-" + arg);
        }
        break;
    }
  }, [])

  const handleMessage = React.useCallback((event: MessageEvent) => {
    const full = event.data as string;
    let smth = full.split("-");
    switch (smth[0]) {
      case "addBets":
          setAddBetOverlay('flex')
        break;
      case "dealDealer":
          setAddBetOverlay('none')
        break;
      case "dealPlayer":
          setActionOverlay('grid')
          const cards: string[][] = JSON.parse(smth[1])
          const scores: PlayerScore[] = JSON.parse(smth[2]);
          const bets: number[] = JSON.parse(smth[3]);

          setCards(cards)
          setScores(scores)
          setBets(bets);
        break;
      case "addPlayerCard":
          const cards2: string[][] = JSON.parse(smth[1])
          const score: PlayerScore[] = JSON.parse(smth[2])
          const bet: number[] = JSON.parse(smth[3])

          if(cards2[0].length > 0){
            setCards(cards2);
            setScores(score);
            setBets(bet);
          }
        break;
      case "activeHand":
          const handNum: number = JSON.parse(smth[1])
          setActiveHand(handNum);
        break;
      case "splitPlayerCards":
          const cardArr: string[][] = JSON.parse(smth[1]);
          const scoreArr: PlayerScore[] = JSON.parse(smth[2]);
          const betsArr: number[] = JSON.parse(smth[3]);
          if(cardArr[0].length > 0){
            setCards(cardArr);
            setScores(scoreArr);
            setBets(betsArr);
          }
        break;
      case "doublePlayerCards":
        const betsD: number[] = JSON.parse(smth[1]);
        setBets(betsD);
        break;
      case "finalDealerDealing":
          setActionOverlay('none')
        break;
      case "gameResults":
        const resultArr: string[] = JSON.parse(smth[1]);
        setResults(resultArr);
        break;
      case "cleanup":
          setCards([]);
          setScores([]);
          setBets([]);
          setResults([]);
          const handsDiv3 = document.getElementById("player-hands-div")!;
        break;
      default:
        break;
  }
  }, []) 

  window.addEventListener('message', handleMessage);

  return (
    <>
      <div id="player-hands-div" ref={playerHandsRef}>
        {cards.length === 1 ? <div className='player-hand'></div> : ""}
        {cards.length > 0 ? 
          cards.map((item, i)=>{
            const isActive: boolean = (i === activeHand);
            const result = results[i] as HandResults;
            return <PlayerHand playerCards={item} playerBet={bets[i]} playerScore={scores[i].first} handNum={i+1} isActive={isActive} winState={result}/>
          })
         : ""}
         {cards.length === 1 ?
          [...Array((cards.length-3)*-1)].map(() =>
          <div className='player-hand'>
          </div>
          )
         : [...Array((cards.length-4)*-1)].map(() =>
         <div className='player-hand'>
         </div>
         )}
      </div>

      <div id="addBet-overlay" style={{display: addBetOverlay}}>
        <h2>ADD BET</h2>
        <button className="tokens" style={{backgroundColor:"orange"}} onClick={()=>handleClick("10")}>10</button>
        <button className="tokens" style={{backgroundColor:"red"}} onClick={()=>handleClick("20")}>20</button>
        <button className="tokens" style={{backgroundColor:"green"}} onClick={()=>handleClick("40")}>40</button>
        <button className="tokens" style={{backgroundColor:"blue"}} onClick={()=>handleClick("80")}>80</button>
        <button className="tokens" style={{backgroundColor:"black"}} onClick={()=>handleClick("100")}>100</button>
      </div>

      <div id="player-action-overlay" style={{display: actionOverlay}}>
        <button id="hit-btn" onClick={()=>handleClick("hit")}>Hit</button>
        <button id="split-btn" onClick={()=>handleClick("split")}>Split</button>
        <button id="stay-btn" onClick={()=>handleClick("stay")}>Stay</button>
        <button id="double-btn" onClick={()=>handleClick("double")}>Double</button>
      </div>   
    </>
  );
}

