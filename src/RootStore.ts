import { SeatsStore } from "./SeatsStore";
import { DealerStore } from "./DealerStore";
import { PhaseStore } from "./PhaseStore";

export class RootStore {
  public readonly seats: SeatsStore;
  public readonly dealer: DealerStore;
  public readonly phase: PhaseStore;

  public constructor() {
    this.seats = new SeatsStore(this);
    this.dealer = new DealerStore(this);
    this.phase = new PhaseStore();
  }
}
