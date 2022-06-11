import { RootStore } from "../../RootStore";
import { getRandomCard } from "../../utils/cardUtils";
type betAmount = 10 | 20 | 40 | 80 | 100;

export function dealPlayer(rootStore: RootStore) {
  rootStore.phase.currentPhase = "Dealing";

  if(rootStore.seats.seats[0].bet){
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  }
  if(rootStore.seats.seats[1].bet){
    rootStore.seats.seats[1].hands[0].addCard(getRandomCard());
    rootStore.seats.seats[1].hands[0].addCard(getRandomCard());
  }
  if(rootStore.seats.seats[2].bet){
    rootStore.seats.seats[2].hands[0].addCard(getRandomCard());
    rootStore.seats.seats[2].hands[0].addCard(getRandomCard());
  }
}
