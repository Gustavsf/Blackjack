import { RootStore } from "../RootStore";
import { getRandomCard } from "../utils/cardUtils";
import { fillDeck } from "../utils/cardUtils";
import { startGame } from "./phase/BetsClosedPhase";
import { addBets } from "./phase/BetsOpenPhase";
import { dealDealer } from "./phase/DealerDealingPhase";
import { dealPlayer } from "./phase/DealingPhase";
import { gameResult } from "./phase/GameResultPhase";
import { dealDealerFinal } from "./phase/FinalDealerPhase";
import { Card } from "./Card";
type betAmount = 10 | 20 | 40 | 80 | 100;
type bets = {
  first: string,
  second: string,
  third: string
}
//card animations
//second value render
//remove cash aat bet

export class BlackJack {
  private handCount: number[] = [1];
  private cards: Card[] = fillDeck();

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
              const amount:bets = JSON.parse(part[1]);
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
            if(this.handCount.includes(num)){
              const index = this.handCount.indexOf(num);
              this.handCount.splice(index, 1)
            }else {
              this.handCount.push(num);
            }
          break;
        default:
          break;
      }
    });
  }

  public async start(){
      if(this.cards.length < 30){
        this.cards = fillDeck();
      }
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

      dealPlayer(this.store, this.cards);
      postMessage("dealPlayer-" + this.store.seats.seatHandsJSON() + "-" + this.store.seats.seatScoreJSON() + "-" + this.store.seats.seatBetJSON())
      this.lastActiveHand();
      await this.delay(1000);
      dealDealer(this.store);
      postMessage("dealDealer-" + this.store.dealer.allCardsJSON() + "-" + this.store.dealer.score.first);
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

      dealDealerFinal(this.store);
      postMessage("finalDealerDealing-" + this.store.dealer.allCardsJSON() + "-" + this.store.dealer.score.first);

      await this.delay(1000);
      postMessage("gameResults-" + this.store.seats.seatResultJSON() + "-" + this.store.seats.seatBetJSON());

      await this.delay(3500);
      gameResult(this.store);
      postMessage('totalCash-'+this.store.seats.seats[0].player.totalAmount)

      await this.delay(1000);
      postMessage("cleanup");
      this.clearHands();
      this.start();
  }
  private addCardOnClick() {
    const hand = this.lastActiveHand();
    if(hand && hand.isDone === false){
      if(this.cards){
        hand.addCard(this.cards.pop() as Card);
      }
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
      const chair = this.lastActiveSeat()
      if(chair)
      chair.player.totalAmount -= firstBet as number
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
  private addBetOnClick(amount: bets){
    const num = amount;
    const seats = this.store.seats.seats;
    for(let i = 0; i<3;i++){
      if(i === 0){
        const a = parseInt(num.first);
        if(a > 0){
          seats[0].player.totalAmount -= a
          seats[i].bet = a as betAmount
          seats[i].hands[0].bet = a as betAmount;
        }
      } else if(i === 1){
        const a = parseInt(num.second);
        if(a > 0){
          seats[0].player.totalAmount -= a
          seats[i].bet = a as betAmount
          seats[i].hands[0].bet = a as betAmount;
        }
      } else if(i === 2){
        const a = parseInt(num.third);
        if(a > 0){
          seats[0].player.totalAmount -= a
          seats[i].bet = a as betAmount
          seats[i].hands[0].bet = a as betAmount;
        }
      }
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