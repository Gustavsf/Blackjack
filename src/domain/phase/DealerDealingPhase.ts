import { RootStore } from "../../RootStore";
import { getRandomCard } from "../../utils/cardUtils";
import { Card } from "../Card";

export function dealDealer(rootStore: RootStore) {
  rootStore.phase.currentPhase = "DealerDealing";
  rootStore.dealer.addCard(getRandomCard());
  rootStore.dealer.addCard(new Card("**"));
}
