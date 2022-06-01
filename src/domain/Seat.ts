import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { Card } from "./Card";
import { Hand, HandId } from "./Hand";
import { Player } from "./Player";

type SeatId = "0";
type betAmount = 10 | 20 | 40 | 80 | 100;

export class Seat {
  public hands: Hand[] = [];
  public bet: betAmount | undefined = undefined;

  public constructor(
    private readonly store: RootStore,
    public readonly id: SeatId,
    public readonly player: Player,
  ) {
    this.hands.push(new Hand(store, "first")),
    makeAutoObservable(this)
  }

  public split(handId: HandId): void {
    const hand = this.findHand(handId);
    const handIdArray: HandId[] = ["first", "second", "third", "fourth"];
    let otherHand: Hand;
    if(hand?.cards.length === 2){
      let a = handIdArray[this.store.seats.seats[0].hands.length];
      otherHand = hand.split(a);
      otherHand.betAmount = this.store.seats.seats[0].bet!;
      this.hands.push(otherHand);
      this.findHand(a)?.score;
    }    
  }

 public clearAllHands(){
    this.hands = [];
    this.bet = undefined;
    this.hands.push(new Hand(this.store, "first"))
 }
 public allHandsJSON() {
  const arr: Card[][] = [];
  this.store.seats.seats[0].hands.map(item=>{
    arr.push(item.cards);
  })
  const hands = JSON.stringify(arr);
  return hands;
  }
  public get state() {
    return this.hands[0];
  }

  public set betAmount(bet: betAmount) {
      this.bet = bet;
      this.player.addToBet(bet);
  }

  public findHand(id: HandId) {
    return this.hands.find((h) => h.id === id);
  }
}
