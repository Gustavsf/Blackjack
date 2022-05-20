import { Seat } from "./domain/Seat";
import { RootStore } from "./RootStore";

export class SeatsStore {
  public seats: Seat[] = [];

  public constructor(store: RootStore) {
    this.seats.push(new Seat(store, "0"));
  }
}
