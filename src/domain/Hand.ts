import { makeAutoObservable } from "mobx";
import { Card } from "./Card";
import { calculateScoreFromCards, checkWinner } from "../utils/cardUtils";
import { RootStore } from "../RootStore";

export type HandId = "first" | "second" | "third" | "fourth";

export class Hand {
  public cards: Card[] = [];
  public result: "Win" | "Lose" | "Push" | undefined = undefined;
  public isDone: boolean = false;
  public bet: number = 0;

  public constructor(
    private readonly store: RootStore,
    public readonly id: HandId,
  ) {
    makeAutoObservable(this);
  }

  public addCard(card: Card): void {
    if(this.store.phase.currentPhase === "Dealing"){
      this.cards.push(card);
    }
  }

  public get score() {
    return calculateScoreFromCards(this.cards);
  }
  public set betAmount(bet: number) {
    this.bet = bet;
  }
  public done() {
    this.isDone = true;
  }
  public allCardsJSON() {
    const cards = JSON.stringify(this.cards);
    return cards;
  }
  public get res() {
    return this.result = checkWinner(
      {first: this.score.first, second: this.score.second}, 
      {first: this.store.dealer.score.first, second: this.store.dealer.score.second});
  }

  public split(id: HandId) {
    const hand = new Hand(this.store, id);
    hand.addCard(this.cards[1]);
    this.cards.splice(1);

    return hand;
  }
}
