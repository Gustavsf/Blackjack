import { Seat } from "./domain/Seat";
import { Player } from "./domain/Player";

import { RootStore } from "./RootStore";
type PlayerScore = {first: number, second: number}

export class SeatsStore {
  public seats: Seat[] = [];

  public constructor(store: RootStore) {
    const player = new Player("tester", store);
    this.seats.push(new Seat(store, "0", player ));
    this.seats.push(new Seat(store, "1", player ));
    this.seats.push(new Seat(store, "2", player ));
  }

  public seatHandsJSON() {
    const arr: string[][][] = [];
    let arr2: string[][] = [];

    this.seats.map(item=>{
      if(item.hands[0].cards.length > 0){
        item.hands.map((item)=>{
          let cardArr: string[] = [];
          item.cards.map(card=>{
            cardArr.push(card.card as string)
          })
          arr2.push(cardArr)
        })
        arr.push(arr2)
        arr2 = []
      }
    })
    const seats = JSON.stringify(arr);
    return seats;
  }
  public seatScoreJSON() {
    const arr: PlayerScore[][] = [];
    let arr2: PlayerScore[] = [];

    this.seats.map(item=>{
      if(item.hands[0].cards.length > 0){
        item.hands.map((item)=>{
          arr2.push(item.score)
        })
        arr.push(arr2)
        arr2 = []
      }
    })
    const score = JSON.stringify(arr);
    return score;
  }
  public seatBetJSON() {
    const arr: number[][] = [];
    let arr2: number[] = [];

    this.seats.map(item=>{
      if(item.hands[0].cards.length > 0){
        item.hands.map((item)=>{
          arr2.push(item.bet)
        })
        arr.push(arr2)
        arr2 = []
      }
    })
    const bet = JSON.stringify(arr);
    return bet;
  }
  public seatResultJSON() {
    const arr: string[][] = [];
    let arr2: string[] = [];

    this.seats.map(item=>{
      if(item.hands[0].cards.length > 0){
        item.hands.map((item)=>{
          arr2.push(item.res)
        })
        arr.push(arr2)
        arr2 = []
      }
    })
    const res = JSON.stringify(arr);
    return res;
  }
}
