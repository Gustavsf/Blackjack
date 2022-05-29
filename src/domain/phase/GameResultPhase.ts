import { RootStore } from "../../RootStore";

export function gameResult(rootStore: RootStore) {
  rootStore.phase.currentPhase = "GameResult";
  console.log("============  " + rootStore.phase.currentPhase + "  ============");
  if(rootStore.seats.seats[0].bet !== undefined){
    for(let i = 0; i < rootStore.seats.seats[0].hands.length; i++){
      const a = rootStore.seats.seats[0].hands[i].bet as number;
  
      if (rootStore.seats.seats[0].hands[i].res === "Win") {
        console.log(rootStore.seats.seats[0].hands[i].id + " hand " + rootStore.seats.seats[0].hands[i].res)
        console.log("+" + a * 2)
      } else if (rootStore.seats.seats[0].hands[i].res === "Push") {
        console.log(rootStore.seats.seats[0].hands[i].id + " hand " + rootStore.seats.seats[0].hands[i].res)
        console.log("~" + a)
      } else {
        console.log(rootStore.seats.seats[0].hands[i].id + " hand " + rootStore.seats.seats[0].hands[i].res)
        console.log("-" + a)
      }
    }
  } else {
    console.log('not playing this round')
  }
}
