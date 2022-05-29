import { RootStore } from "../../RootStore";
import { getRandomCard, shouldDraw } from "../../utils/cardUtils";

export function dealDealerFinal(rootStore: RootStore) {
    rootStore.phase.currentPhase = "finalDealerDealing";
    console.log("============  " + rootStore.phase.currentPhase + "  ============");
    while(shouldDraw(rootStore)){
        rootStore.dealer.addCard(getRandomCard());
    }
    rootStore.dealer.cards.map(item=>{
        console.log(item.card);
    })

    console.log(`Dealer hand score: ${rootStore.dealer.score.first}(${rootStore.dealer.score.second})`)
}