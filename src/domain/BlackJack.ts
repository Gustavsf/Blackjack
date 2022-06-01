import { RootStore } from "../RootStore";
import { getRandomCard } from "../utils/cardUtils";
import { startGame } from "./phase/BetsClosedPhase";
import { addBets } from "./phase/BetsOpenPhase";
import { dealDealer } from "./phase/DealerDealingPhase";
import { dealPlayer } from "./phase/DealingPhase";
import { gameResult } from "./phase/GameResultPhase";
import { dealDealerFinal } from "./phase/FinalDealerPhase";
import { Card } from "./Card";

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
      const msg = "dealDealer-" + this.store.dealer.allCardsJSON();
      postMessage(msg);
      await this.delay(2000);

      if(this.store.seats.seats[0].bet !== undefined){
        dealPlayer(this.store);
        const msg2 = "dealPlayer-" + this.store.seats.seats[0].allHandsJSON();
        postMessage(msg2);
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

      dealDealerFinal(this.store);
      const msg3 = "finalDealerDealing-" + this.store.dealer.allCardsJSON();
      postMessage(msg3);
      //postMessage("finalDealerDealing");
      await this.delay(5000);

      postMessage("gameResults");
      gameResult(this.store);
      await this.delay(3000);
      this.clearHands();
      this.start();
  }
  private addCardOnClick() {
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      this.printCards();
      const rand = getRandomCard()
      hand.addCard(rand);
      postMessage("addPlayerCard-" + rand.card + "-" + hand.id);

      console.log(rand.card);
      console.log(hand.score);
    }
  }
  private splitOnClick() {
    
    //if ace only one split, one card to each hand, can double down
    const seat = this.store.seats.seats[0];
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false && hand.id !== "fourth"){
      seat.split(hand.id);
      const hands = this.store.seats.seats[0].hands
      const arr: Card[][] = [];
      this.store.seats.seats[0].hands.map(item=>{
        arr.push(item.cards);
      })
      const handsString = JSON.stringify(arr);
      postMessage("splitPlayerCards-" + handsString)
      hands.map((item)=>{
        console.log(item.cards[0].card);
        console.log(`${item.id} hand score: ${item.score.first}(${item.score.second})`);
      })
    }
  }
  private lastActiveHand(){
    const hands = this.store.seats.seats[0].hands;
    const handsLenght = hands.length;
    for (let i = handsLenght; i > 0; i--) {
      if (hands[i-1].isDone === false) {
        return hands[i-1];
      }
    }
  }
  private clearHands(){
    const seat = this.store.seats.seats[0];
    seat.clearAllHands();
    this.store.dealer.clearHand();
  }
  private printCards(){
    const hand = this.lastActiveHand();
    if(hand){
      console.log('Active hand: ' + hand.id);
      hand.cards.map(item=>{
        console.log(item.card);
      })
    }
  }
  
  
  private addBetOnClick(){
    this.store.seats.seats[0].betAmount = 20;
    this.store.seats.seats[0].hands[0].betAmount = 20;
  }
  private doubleOnClick(){
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
  private stayOnClick(){
    const hand = this.lastActiveHand();
    hand?.done();
    this.printCards();
  }
  private delay(time: number){
      return new Promise((resolve) =>{
        window.setTimeout(resolve, time)
      }) 
  }
}