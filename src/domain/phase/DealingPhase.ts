import { RootStore } from "../../RootStore";
import { getRandomCard } from "../../utils/cardUtils";


export function dealPlayer(rootStore: RootStore) {
  rootStore.phase.currentPhase = "Dealing";
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
}
