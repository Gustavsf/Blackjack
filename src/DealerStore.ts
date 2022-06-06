import { Card } from "./domain/Card";
import { RootStore } from "./RootStore";
import { calculateScoreFromCards } from "./utils/cardUtils";

export class DealerStore {
  public cards: Card[] = [];

  constructor(private readonly store: RootStore){}

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public get score() {
    return calculateScoreFromCards(this.cards);
  }
  public allCardsJSON() {
    const arr: string[] = [];
    this.cards.map(item=>{
      arr.push(item.cardValue)
    })
    const cards = JSON.stringify(arr);
    return cards;
  }
  public clearHand(){
    this.cards = [];
  }

  public get isHiddenCardDealt(): boolean {
    return this.cards.length > 1 && this.cards[1].isHidden;
  }
}
