import { RootStore } from "../../RootStore";
import { getRandomCard, shouldDraw } from "../../utils/cardUtils";

export function dealDealerFinal(rootStore: RootStore) {
    rootStore.phase.currentPhase = "finalDealerDealing";
    while(shouldDraw(rootStore)){
        rootStore.dealer.addCard(getRandomCard());
    }
}