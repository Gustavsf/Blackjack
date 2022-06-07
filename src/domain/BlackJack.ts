import { RootStore } from "../RootStore";
import { getRandomCard } from "../utils/cardUtils";
import { startGame } from "./phase/BetsClosedPhase";
import { addBets } from "./phase/BetsOpenPhase";
import { dealDealer } from "./phase/DealerDealingPhase";
import { dealPlayer } from "./phase/DealingPhase";
import { gameResult } from "./phase/GameResultPhase";
import { dealDealerFinal } from "./phase/FinalDealerPhase";
type betAmount = 10 | 20 | 40 | 80 | 100;
//card design
//card animations
//win animation
//second value render
//total cash render
//timer render

export class BlackJack {
  public constructor(
    private readonly store: RootStore,
  ){
    window.addEventListener('message', (event) => {
      const full = event.data as string;
      let part = full.split("-");
      switch (part[0]) {
        case "addCardOnClick":
            this.addCardOnClick();
          break;
        case "splitOnClick":
            this.splitOnClick();
          break;
        case "addBetOnClick":
              const amount = part[1];
              this.addBetOnClick(amount);
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
          const full = event.data as string;
          let part = full.split("-");
          if(part[0] === "addBetOnClick"){
            window.setTimeout(resolve, 1000)
          }
        })
      }) 
      
      dealDealer(this.store);
      postMessage("dealDealer-" + this.store.dealer.allCardsJSON() + "-" + this.store.dealer.score.first);
      await this.delay(2000);

      if(this.store.seats.seats[0].bet !== undefined){
        dealPlayer(this.store);
        postMessage("dealPlayer-" + this.store.seats.seats[0].allHandsJSON() + "-" + this.store.seats.seats[0].allHandsScoreJSON() + 
        "-" + this.store.seats.seats[0].allHandsBetsJSON());
        
        await new Promise((resolve) =>{
          window.addEventListener('message', (event) => {
            if(event.data === "playerAction"){
              clearTimeout(timeout)
              if(this.lastActiveHand()){
                timeout = window.setTimeout(resolve, 100000000)
              } else {
                timeout = window.setTimeout(resolve, 100)
              }
            }
          })
          let timeout = window.setTimeout(resolve, 10000)
        }) 
      }

      dealDealerFinal(this.store);
      postMessage("finalDealerDealing-" + this.store.dealer.allCardsJSON() + "-" + this.store.dealer.score.first);
      
      await this.delay(1000);
      postMessage("gameResults-" + this.store.seats.seats[0].allHandsResultJSON());

      await this.delay(3000);
      gameResult(this.store);

      await this.delay(3000);
      postMessage("cleanup");

      this.clearHands();
      this.start();
  }
  private addCardOnClick() {
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      const rand = getRandomCard()
      hand.addCard(rand);
      postMessage("addPlayerCard-" + this.store.seats.seats[0].allHandsJSON() + "-" + this.store.seats.seats[0].allHandsScoreJSON() + 
        "-" + this.store.seats.seats[0].allHandsBetsJSON());
    }
  }
  private splitOnClick() {
    const seat = this.store.seats.seats[0];
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false && seat.hands.length < 4){
      seat.split(hand.id);
      postMessage("splitPlayerCards-" + this.store.seats.seats[0].allHandsJSON() + "-" + this.store.seats.seats[0].allHandsScoreJSON() + "-" + this.store.seats.seats[0].allHandsBetsJSON())
      this.lastActiveHand();
    }
  }
  private doubleOnClick(){
    const firstBet = this.store.seats.seats[0].bet;
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      const doubled = firstBet! * 2;
      hand.betAmount = doubled;
      this.addCardOnClick();
      hand.done();
      postMessage("doublePlayerCards-" + this.store.seats.seats[0].allHandsBetsJSON())
      this.lastActiveHand();
    }
  }
  private lastActiveHand(){
    const hands = this.store.seats.seats[0].hands;
    const handsLenght = hands.length;
    for (let i = handsLenght; i > 0; i--) {
      if (hands[i-1].isDone === false) {
        postMessage("activeHand-" + (i-1))
        return hands[i-1];
      }
    }
  }
  private clearHands(){
    const seat = this.store.seats.seats[0];
    seat.clearAllHands();
    this.store.dealer.clearHand();
  }
  private addBetOnClick(amount: string){
    const num = parseInt(amount) as betAmount;
    this.store.seats.seats[0].betAmount = num;
    this.store.seats.seats[0].hands[0].betAmount = num;
  }
  private stayOnClick(){
    const hand = this.lastActiveHand();
    hand?.done();
    this.lastActiveHand();
  }
  private delay(time: number){
      return new Promise((resolve) =>{
        window.setTimeout(resolve, time)
      }) 
  }
}