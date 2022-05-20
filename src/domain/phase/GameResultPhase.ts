import { RootStore } from "../../RootStore";

export function gameResult(rootStore: RootStore) {
  // const seat = rootStore.seats.seats[0];

  // console.log(seat.hands[0].score + " hand score");
  // console.log(rootStore.dealer.score + " dealer score");
  // console.log(seat.hands[0].res);

  window.setTimeout(() => {
    rootStore.phase.currentPhase = "BetsOpen";
  }, 2000);
}
