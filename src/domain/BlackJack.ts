import { RootStore } from "../RootStore";
import { getRandomCard, shouldDraw } from "../utils/cardUtils";
import { Card } from "./Card";
import { startGame } from "./phase/BetsClosedPhase";
import { addBets } from "./phase/BetsOpenPhase";
import { dealDealer } from "./phase/DealerDealingPhase";
import { dealPlayer } from "./phase/DealingPhase";
import { gameResult } from "./phase/GameResultPhase";
import { dealDealerFinal } from "./phase/FinalDealerPhase";

export class BlackJack {

  public constructor(
    private readonly store: RootStore,
  ){
    window.addEventListener('message', (event) => {
      switch (event.data) {
        case "addCardOnClick":
            this.addCardOnClick();
          break;
        case "splitOnClick":
            this.splitOnClick();
            this.printCards();
          break;
        case "addBetOnClick":
              this.addBetOnClick();
          break;
        case "doubleOnClick":
            this.doubleOnClick();
          break;
        case "stayOnClick":
            this.stayOnClick();
          break;
        case "playerAction":
            //should add to delay in start
          break;
        default:
          break;
      }
    });
  }

  public async start(){
      startGame(this.store);
      addBets(this.store);
      postMessage("addBets");
      await new Promise((resolve) =>{
        window.addEventListener('message', (event) => {
          if(event.data === "addBetOnClick"){
            window.setTimeout(resolve, 1000)
          }
        })
      }) 

      dealDealer(this.store);
      postMessage("dealDealer");
      await this.delay(2000);

      if(this.store.seats.seats[0].bet !== undefined){
        dealPlayer(this.store);
        postMessage("dealPlayer");
        await new Promise((resolve) =>{
          window.addEventListener('message', (event) => {
            if(event.data === "playerAction"){
              clearTimeout(timeout)
              if(this.lastActiveHand()){
                timeout = window.setTimeout(resolve, 7000)
              } else {
                timeout = window.setTimeout(resolve, 100)
              }
            }
          })
          let timeout = window.setTimeout(resolve, 10000)
        }) 
      }
      
      postMessage("finalDealerDealing");
      dealDealerFinal(this.store);
      await this.delay(1000);

      postMessage("gameResults");
      gameResult(this.store);
      await this.delay(3000);
      this.clearHands();
      this.start();
  }

  public lastActiveHand(){
    const hands = this.store.seats.seats[0].hands;
    const handsLenght = hands.length;
    for (let i = handsLenght; i > 0; i--) {
      if (hands[i-1].isDone === false) {
        return hands[i-1];
      }
    }
  }
  public clearHands(){
    const seat = this.store.seats.seats[0];
    seat.clearAllHands();
    this.store.dealer.clearHand();
  }
  public printCards(){
    const hand = this.lastActiveHand();
    if(hand){
      console.log('Active hand: ' + hand.id);
      hand.cards.map(item=>{
        console.log(item.card);
      })
    }
  }
  public splitOnClick() {
    //if ace only one split, one card to each hand, can double down
    const seat = this.store.seats.seats[0];
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      seat.split(hand.id);
      const hands = this.store.seats.seats[0].hands
      hands.map((item)=>{
        console.log(item.cards[0].card);
        console.log(`${item.id} hand score: ${item.score.first}(${item.score.second})`);
      })
    }
  }
  public addCardOnClick() {
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      this.printCards();
      const rand = getRandomCard()
      hand.addCard(rand);
      console.log(rand.card);
      console.log(hand.score);
    }
  }
  public addBetOnClick(){
    this.store.seats.seats[0].betAmount = 20;
    this.store.seats.seats[0].hands[0].betAmount = 20;
  }
  public doubleOnClick(){
    const firstBet = this.store.seats.seats[0].bet;
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      const doubled = firstBet! * 2;
      console.log("New bet: " + doubled);
      hand.betAmount = doubled;
      this.addCardOnClick();
      hand.done();
    }
  }
  public stayOnClick(){
    const hand = this.lastActiveHand();
    hand?.done();
    this.printCards();
  }
  public delay(time: number){
      return new Promise((resolve) =>{
        window.setTimeout(resolve, time)
      }) 
  }
}