type HiddenCard = "**";
type Suit = "S" | "C" | "H" | "D";
type Value = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";

type CardType = `${Value}${Suit}` | HiddenCard;

export class Card {
  private readonly value: CardType;

  public constructor(value: CardType) {
    this.value = value;
  }

  public get isHidden() {
    return this.value === "**";
  }
  
  public get cardValue() {
    return this.value;
  }
}