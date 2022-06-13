import { RootStore } from "../../RootStore";
import { Card } from "../Card";
type betAmount = 10 | 20 | 40 | 80 | 100;

export function dealPlayer(rootStore: RootStore, cards: Card[]) {
  rootStore.phase.currentPhase = "Dealing";

  if(rootStore.seats.seats[0].bet){
  rootStore.seats.seats[0].hands[0].addCard(cards.pop() as Card);
  rootStore.seats.seats[0].hands[0].addCard(cards.pop() as Card);
  }
  if(rootStore.seats.seats[1].bet){
    rootStore.seats.seats[1].hands[0].addCard(cards.pop() as Card);
    rootStore.seats.seats[1].hands[0].addCard(cards.pop() as Card);
  }
  if(rootStore.seats.seats[2].bet){
    rootStore.seats.seats[2].hands[0].addCard(cards.pop() as Card);
    rootStore.seats.seats[2].hands[0].addCard(cards.pop() as Card);
  }
}
