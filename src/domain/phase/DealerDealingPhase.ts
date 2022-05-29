import { RootStore } from "../../RootStore";
import { getRandomCard } from "../../utils/cardUtils";
import { Card } from "../Card";

export function dealDealer(rootStore: RootStore) {
  rootStore.phase.currentPhase = "DealerDealing";
  console.log("============  "+rootStore.phase.currentPhase+"  ============");
  
  rootStore.dealer.addCard(getRandomCard());
  rootStore.dealer.addCard(new Card("**"));
  rootStore.dealer.cards.map(item=>{
        console.log(item.card);
      })
  console.log(`Dealer hand score:${rootStore.dealer.score.first}(${rootStore.dealer.score.second})`)
}
