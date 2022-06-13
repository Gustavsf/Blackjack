import { RootStore } from "../../RootStore";
import { shouldDraw } from "../../utils/cardUtils";
import { Card } from "../Card";

export function dealDealerFinal(rootStore: RootStore, cards: Card[]) {
    rootStore.phase.currentPhase = "finalDealerDealing";
    while(shouldDraw(rootStore)){
        rootStore.dealer.addCard(cards.pop() as Card);
    }
}