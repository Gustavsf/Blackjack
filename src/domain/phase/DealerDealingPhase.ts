import { RootStore } from "../../RootStore";
import { Card } from "../Card";

export function dealDealer(rootStore: RootStore, cards: Card[]) {
  rootStore.phase.currentPhase = "DealerDealing";
  rootStore.dealer.addCard(cards.pop() as Card);
  rootStore.dealer.addCard(new Card("**"));
}
