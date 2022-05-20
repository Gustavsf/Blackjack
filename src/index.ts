import "./styles.css";
import { RootStore } from "./RootStore";
import { startGame } from "./domain/phase/BetsClosedPhase";
import { dealDealer } from "./domain/phase/DealerDealingPhase";
import { dealPlayer } from "./domain/phase/DealingPhase";
import { gameResult } from "./domain/phase/GameResultPhase";
import { addBets } from "./domain/phase/BetsOpenPhase";

import { observe } from "mobx";

const rootStore = new RootStore();

observe(rootStore.phase, "current", (change) => {
  switch (change.newValue) {
    case "BetsClosed":
      console.log("betsclosed");
      break;
    case "BetsOpen":
      addBets(rootStore);
      console.log("betsopen");
      break;
    case "DealerDealing":
      dealDealer(rootStore);
      console.log("dealer dealing");
      break;
    case "Dealing":
      dealPlayer(rootStore);
      console.log("dealingxx");
      break;
    case "GameResult":
      gameResult(rootStore);
      break;
    default:
      break;
  }
});

startGame(rootStore);
