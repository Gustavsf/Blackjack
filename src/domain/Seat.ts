import { RootStore } from "../RootStore";
import { Hand, HandId } from "./Hand";
import { Player } from "./Player";

type SeatId = "0";

export class Seat {
  public readonly player: Player | undefined = undefined;
  public readonly hands: Hand[] = [];

  public constructor(
    private readonly store: RootStore,
    public readonly id: SeatId
  ) {
    this.hands.push(new Hand(store, "first"));
  }

  public split() {
    const firstHand = this.findHand("first");
    if (firstHand) {
      const secondHand = firstHand.split("second");
      this.hands.push(secondHand);
    }
  }

  public findHand(id: HandId) {
    return this.hands.find((h) => h.id === id);
  }
}
