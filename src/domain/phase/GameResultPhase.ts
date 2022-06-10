import { RootStore } from "../../RootStore";

export function gameResult(rootStore: RootStore) {
  rootStore.phase.currentPhase = "GameResult";
  rootStore.seats.seats.map((seat)=>{
    seat.hands.map(hand => {
      const bet = hand.bet
      if(hand.res === "Win"){
        seat.player.winFromBet(bet * 2)
      }
      if(hand.res === "Push"){
        seat.player.winFromBet(bet)
      }
    })
  })
}
