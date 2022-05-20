import { Card } from "./domain/Card";
import { RootStore } from "./RootStore";
import { calculateScoreFromCards } from "./utils/cardUtils";

export class DealerStore {
  public readonly cards: Card[] = [];

  constructor(private readonly store: RootStore){}

  public addCard(card: Card): void {
    if(this.store.phase.currentPhase === "DealerDealing"){
      this.cards.push(card);
    }
  }

  public get score() {
    return calculateScoreFromCards(this.cards);
  }

  public get isHiddenCardDealt(): boolean {
    return this.cards.length > 1 && this.cards[1].isHidden;
  }
}
