import type { Card } from "../domain/Card";

export function calculateScoreFromCards(cards: Card[]) {
  let value = 0;
  let secondValue = 0;

  cards.forEach((item) => {
    const val = item.cardValue;
    if (val !== "**") {
      const splitVal = val.split("");
      const num = +splitVal[0];
      if (!isNaN(num)) {
        value += num;
        secondValue += num;
      } else {
        if (["T", "J", "Q", "K"].includes(splitVal[0])) {
          value += 10;
          secondValue += 10;
        } else {
          secondValue += 1;
          value += 11;
        }
      }
    }
  });
  return {
    first: value,
    second: secondValue
  };
}

export function checkWinner(
  playerScore: {
    first: number,
    second: number
  },
  dealerScore: {
    first: number,
    second: number
  }
): "Win" | "Lose" | "Push" {
  let result: "Win" | "Lose" | "Push" = "Lose";
  if (playerScore.first <= 21 && playerScore.first > dealerScore.first) {
    result = "Win";
  } else if (playerScore.first === dealerScore.first) {
    result = "Push";
  } else {
    result = "Lose";
  }
  return result;
}
