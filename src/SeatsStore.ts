import { Seat } from "./domain/Seat";
import { Player } from "./domain/Player";

import { RootStore } from "./RootStore";

export class SeatsStore {
  public seats: Seat[] = [];

  public constructor(store: RootStore) {
    this.seats.push(new Seat(store, "0", new Player("tester", store)));
  }
}
