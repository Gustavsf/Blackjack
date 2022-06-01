import { observe, reaction } from "mobx";
import { RootStore } from "../../RootStore";
import { getRandomCard } from "../../utils/cardUtils";


export function dealPlayer(rootStore: RootStore) {
  rootStore.phase.currentPhase = "Dealing";
  console.log("============  " + rootStore.phase.currentPhase + "  ============");
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  rootStore.seats.seats[0].hands[0].addCard(getRandomCard());
  console.log(`${rootStore.seats.seats[0].hands[0].id} hand score:${rootStore.seats.seats[0].hands[0].score.first}(${rootStore.seats.seats[0].hands[0].score.second})`)
  console.log('Active hand: ' + rootStore.seats.seats[0].hands[0].id);
}
