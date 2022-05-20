import type { Card } from "../domain/Card";

export function calculateScoreFromCards(cards: Card[]): number {
  let value = 0;
  cards.forEach((item) => {
    const val = item.cardValue;
    if (val !== "**") {
      const splitVal = val.split("");
      const num = +splitVal[0];
      if (!isNaN(num)) {
        value += num;
      } else {
        if (["T", "J", "Q", "K"].includes(splitVal[0])) {
          value += 10;
        } else {
          // plus second value
          value += 11;
        }
      }
    }
  });
  return value;
}

export function checkWinner(
  playerScore: number,
  dealerScore: number
): "Win" | "Lose" | "Push" {
  let result: "Win" | "Lose" | "Push" = "Lose";
  if (playerScore <= 21 && playerScore > dealerScore) {
    result = "Win";
  } else if (playerScore === dealerScore) {
    result = "Push";
  } else {
    result = "Lose";
  }
  return result;
}
