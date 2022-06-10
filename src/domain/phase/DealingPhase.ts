import { RootStore } from "../../RootStore";
import { getRandomCard } from "../../utils/cardUtils";

export function dealPlayer(rootStore: RootStore) {
  rootStore.phase.currentPhase = "Dealing";
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  if(rootStore.seats.seats[1].bet){
    rootStore.seats.seats[1].hands[0].addCard(getRandomCard());
    rootStore.seats.seats[1].hands[0].addCard(getRandomCard());
  }
  if(rootStore.seats.seats[2].bet){
    rootStore.seats.seats[2].hands[0].addCard(getRandomCard());
    rootStore.seats.seats[2].hands[0].addCard(getRandomCard());
  }
}
