import { RootStore } from "../RootStore";
import { getRandomCard } from "../utils/cardUtils";
import { startGame } from "./phase/BetsClosedPhase";
import { addBets } from "./phase/BetsOpenPhase";
import { dealDealer } from "./phase/DealerDealingPhase";
import { dealPlayer } from "./phase/DealingPhase";
import { gameResult } from "./phase/GameResultPhase";
import { dealDealerFinal } from "./phase/FinalDealerPhase";
type betAmount = 10 | 20 | 40 | 80 | 100;

//card animations
//win animation
//second value render
//total cash render
//timer render

export class BlackJack {
  private handCount = 1;
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
        case "handcount":
            const num = parseInt(part[1]);
            this.handCount = num;
          break;
        default:
          break;
      }
    });
  }

  public async start(){
      startGame(this.store);
      postMessage('totalCash-'+this.store.seats.seats[0].player.totalAmount)
      addBets(this.store);
      postMessage("addBets");
      await new Promise((resolve) =>{
        window.addEventListener('message', (event) => {
          const full = event.data as string;
          let part = full.split("-");
          if(part[0] === "addBetOnClick"){
            window.setTimeout(resolve, 10)
          }
        })
      })
      postMessage('totalCash-'+this.store.seats.seats[0].player.totalAmount)
      
      if(this.store.seats.seats[0].bet !== undefined){
        dealPlayer(this.store);
        postMessage("dealPlayer-" + this.store.seats.seatHandsJSON() + "-" + this.store.seats.seatScoreJSON() + "-" + this.store.seats.seatBetJSON())
        await this.delay(1000);
        dealDealer(this.store);
        postMessage("dealDealer-" + this.store.dealer.allCardsJSON() + "-" + this.store.dealer.score.first);
        await this.delay(2000);
        postMessage("timer-" + 10)
        
        await new Promise((resolve) =>{
          window.addEventListener('message', (event) => {
            if(event.data === "playerAction"){
              clearTimeout(timeout)
              if(this.lastActiveHand()){
                timeout = window.setTimeout(resolve, 10000)
                postMessage("timer-" + 10)
              } else {
                timeout = window.setTimeout(resolve, 100)
                postMessage("timer-" + 0)
              }
            }
          })
          let timeout = window.setTimeout(resolve, 10000)
          postMessage("timer-" + 10)
        }) 
      }

      dealDealerFinal(this.store);
      postMessage("finalDealerDealing-" + this.store.dealer.allCardsJSON() + "-" + this.store.dealer.score.first);
      
      await this.delay(1000);
      postMessage("gameResults-" + this.store.seats.seatResultJSON());

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
      postMessage("addPlayerCard-" + this.store.seats.seatHandsJSON() + "-" + this.store.seats.seatScoreJSON() + "-" + this.store.seats.seatBetJSON());
    }
  }
  private splitOnClick() {
    const seat = this.lastActiveSeat();
    const hand = this.lastActiveHand();
    if(seat)
    if(hand && hand.isDone === false && seat.hands.length < 3){
      seat.split(hand.id);
      postMessage("splitPlayerCards-" + this.store.seats.seatHandsJSON() + "-" + this.store.seats.seatScoreJSON() + "-" + this.store.seats.seatBetJSON());
      this.lastActiveHand();
    }
  }
  private doubleOnClick(){
    const firstBet = this.lastActiveSeat()!.bet;
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      const doubled = firstBet! * 2;
      hand.betAmount = doubled;
      this.addCardOnClick();
      hand.done();
      postMessage("doublePlayerCards-" + this.store.seats.seatBetJSON())
      this.lastActiveHand();
    }
  }
  private lastActiveHand(){
    const seats = this.store.seats.seats;
    for (let i = seats.length; i > 0; i--) {
      for (let z = seats[i-1].hands.length; z > 0; z--) {
        if (seats[i-1].hands[z-1].isDone === false && seats[i-1].hands[z-1].cards.length > 0) {
          postMessage("activeHand-" + (z-1) + "-" + seats[i-1].id);
          return seats[i-1].hands[z-1];
        }
      }
    }
  }
  private lastActiveSeat(){
    const seats = this.store.seats.seats;
    for (let i = seats.length; i > 0; i--) {
      for (let z = seats[i-1].hands.length; z > 0; z--) {
        if (seats[i-1].hands[z-1].isDone === false && seats[i-1].hands[z-1].cards.length > 0) {
          return seats[i-1];
        }
      }
    }
  }
  private clearHands(){
    const seats = this.store.seats.seats;
    seats.map(item=>{
      item.clearAllHands();
    })
    this.store.dealer.clearHand();
  }
  private addBetOnClick(amount: string){
    const num = parseInt(amount) as betAmount;
    const seats = this.store.seats.seats;
    for(let i = 0; i< this.handCount;i++){
      seats[i].betAmount = num;
      seats[i].hands[0].betAmount = num;
    }
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