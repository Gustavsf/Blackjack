import { observe } from "mobx";
import { RootStore } from "../../RootStore";

export function dealPlayer(rootStore: RootStore) {

  const discard = observe(rootStore.seats.seats[0].hands[0].cards, () => {
    clearTimeout(timeout);
    if(rootStore.seats.seats[0].hands[0].score < 21){
      dealPlayer(rootStore);
    } else {
      if(!rootStore.seats.seats[0].hands[1]){
        rootStore.phase.currentPhase = "GameResult";
        } else if(rootStore.seats.seats[0].hands[1].score < 21){
          dealPlayer(rootStore);
          } else {
          rootStore.phase.currentPhase = "GameResult";
        }
    }
    discard();
  })

  if (rootStore.seats.seats[0].hands[1]){
    console.log('exists')
    const discard2 = observe(rootStore.seats.seats[0].hands[1].cards, () => {
    clearTimeout(timeout);
    if(rootStore.seats.seats[0].hands[1].score < 21){
      dealPlayer(rootStore);
    } else {
      if(!rootStore.seats.seats[0].hands[0]){
        rootStore.phase.currentPhase = "GameResult";
        } else if(rootStore.seats.seats[0].hands[0].score < 21){
          dealPlayer(rootStore);
          } else {
          rootStore.phase.currentPhase = "GameResult";
        }
    }
    discard2();
    })
  }
  
  const timeout = window.setTimeout(() => {
    rootStore.phase.currentPhase = "GameResult";  
  }, 5000);
}
