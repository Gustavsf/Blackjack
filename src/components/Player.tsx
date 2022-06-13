import * as React from 'react'
import { AddBetOverlay } from "./AddBet"
import { PlayerActionOverlay } from "./PlayerAction"
import { PlayerHands } from "./AllPlayerHands"
import { Cash } from "./TotalCash"
import { Timer } from "./Timer"
import { Canvas } from "./Canvas"
import {Howl} from 'howler';
const alarm = require("../sounds/coin-sound.wav");

type PlayerScore = {first: number, second: number}
type BetOverlay = "none" | "grid";
type ActionOverlay = "none" | "grid";
type bets = {
  first: string,
  second: string,
  third: string
}
var sound = new Howl({
  src: [alarm]
});
export const Player = () =>  {
  const [cards, setCards] = React.useState<string[][][]>([])
  const [scores, setScores] = React.useState<PlayerScore[][]>([])
  const [bets, setBets] = React.useState<number[][]>([])
  const [results, setResults] = React.useState<string[][]>([])
  const [money, setMoney] = React.useState<number>(0)

  const [totalWin, setTotalWin] = React.useState<number>(0)
  const [activeHand, setActiveHand] = React.useState<[number, number]>([0, 0])
  const [addBetOverlay, setAddBetOverlay] = React.useState<BetOverlay>("none")
  const [actionOverlay, setActionOverlay] = React.useState<ActionOverlay>("none")
  const [emptySeats, setEmptySeats] = React.useState<bets>()
  const [winAnim, setWinAnim] = React.useState<boolean>(false)
  
  const winRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  
  const [timer, setTimer] = React.useState<number>(0)
  React.useEffect(()=>{
    let timeout = setTimeout(()=>{
      if(timer !== 0){
        setTimer(timer - 1)
      }else {
        clearTimeout(timeout)
      }
    }, 1000)
    return () => clearInterval(timeout)
  }, [timer])
  
  const handleMessage = React.useCallback((event: MessageEvent) => {
    const full = event.data as string;
    let smth = full.split("-");
    switch (smth[0]) {
      case "addBets":
          setAddBetOverlay("grid")
        break;
      case "dealDealer":
        setAddBetOverlay('none')
        break;
      case "dealPlayer":
          setAddBetOverlay('none')
          setActionOverlay('grid')
          addToState(smth[1], smth[2], smth[3])
        break;
      case "addPlayerCard":
          addToState(smth[1], smth[2], smth[3])
        break;
      case "activeHand":
          const handNum: number = JSON.parse(smth[1])
          const seatNum: number = JSON.parse(smth[2])
          setActiveHand([seatNum, handNum]);
        break;
      case "splitPlayerCards":
          addToState(smth[1], smth[2], smth[3])
        break;
      case "doublePlayerCards":
          const betsD: number[][] = JSON.parse(smth[1]);
          setBets(betsD);
        break;
      case "totalCash":
          const moneyNum: number = JSON.parse(smth[1]);
          setMoney(moneyNum);
        break;
      case "timer":
          const time: number = JSON.parse(smth[1]);
          setTimer(time)
        break;
      case "addBetOnClick":
          const bet: bets = JSON.parse(smth[1]);
          setEmptySeats(bet)
        break;
      case "finalDealerDealing":
          setActionOverlay('none')
        break;
      case "gameResults":
        const resultArr: string[][] = JSON.parse(smth[1]);
        const betsArr: number[][] = JSON.parse(smth[2]);
        setResults(resultArr);
        calcBet(resultArr, betsArr)
        break;
      case "cleanup":
          setCards([]);
          setScores([]);
          setBets([]);
          setResults([]);
          setTotalWin(0);
          if(winRef.current)
          winRef.current.style.display = "none"
        break;
      default:
        break;
  }
  }, [])

  const addToState = (str1: string, str2: string, str3: string) =>{
    const cardArr: string[][][] = JSON.parse(str1);
    const scoreArr: PlayerScore[][] = JSON.parse(str2);
    const betsArr: number[][] = JSON.parse(str3);
    if(cardArr[0].length > 0){
        setCards(cardArr);
        setScores(scoreArr);
        setBets(betsArr);
      }
  }

  const calcBet = (arr: string[][], betA: number[][]) =>{
    let hasWinner = false;
    let totalWin = 0;
    arr.map((item, i)=>{
      item.map((str, z)=>{
        if(str === "Win"){
          hasWinner = true;
          const num = betA[i][z]
          totalWin += num * 2;
        }
      })
    })
    const moveToCash = [
      { transform: 'translate(0vw, 0vh)',
        opacity: '1'         
      },
      { transform: 'translate(-50vw, 80vh)',
        opacity: '0'
     }
    ];
    const timing = {
      duration: 1000,
      iterations: 1,
    }
    if(hasWinner){
    sound.play();
    }
    setTimeout(()=>{
      if(winRef.current && winRef.current.innerHTML !== "0")
      if(hasWinner){
        winRef.current.style.display = "block"
        setWinAnim(true)
        setTimeout(()=>{
        winRef.current?.animate(moveToCash, timing) 
        },2300)
      }
    },1000)
    setTotalWin(totalWin);
    setWinAnim(false)
  }
  window.addEventListener('message', handleMessage);

  return (
    <>

      <Canvas shouldRender={winAnim}/>
      <h1 id='total-win' ref={winRef} style={{position: "absolute", display: "none"}}>WON: {totalWin}</h1>
      <PlayerHands cards={cards} scores={scores} results={results} bets={bets} activeHand={activeHand} emptySeats={emptySeats}/>
      <AddBetOverlay addBetOverlay={addBetOverlay}/>
      <PlayerActionOverlay actionOverlay= {actionOverlay}/>
      <Cash money={money}/>
      <Timer seconds={timer} display={'block'}/>
    </>
  );
}

