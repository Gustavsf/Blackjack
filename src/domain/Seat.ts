import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { Hand, HandId } from "./Hand";
import { Player } from "./Player";

type SeatId = "0" | "1" | "2";
type betAmount = 10 | 20 | 40 | 80 | 100;
type PlayerScore = {first: number, second: number}

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
      let a = handIdArray[this.hands.length];
      otherHand = hand.split(a);
      otherHand.betAmount = this.bet!;
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
  const arr: string[][] = [];
    this.hands.map(item=>{
      const arr2: string[] = []
      item.cards.map(item=>{
        arr2.push(item.card as string)
      })
      arr.push(arr2);
    })
    const hands = JSON.stringify(arr);
    return hands;
  }

  public allHandsScoreJSON() {
    const arr: PlayerScore[] = [];
    this.hands.map(item=>{
      arr.push(item.score);
    })
    const handScore = JSON.stringify(arr);
    return handScore;
  }

  public allHandsBetsJSON() {
    const arr: number[] = [];
    this.hands.map(item=>{
      arr.push(item.bet);
    })
    const handBets = JSON.stringify(arr);
    return handBets;
  }
  public allHandsResultJSON() {
    const arr: string[] = [];
    this.hands.map(item=>{
      arr.push(item.res);
    })
    const handResults = JSON.stringify(arr);
    return handResults;
  }

  public set betAmount(bet: betAmount) {
      this.bet = bet;
      this.player.addToBet(bet);
  }

  public findHand(id: HandId) {
    return this.hands.find((h) => h.id === id);
  }
}
