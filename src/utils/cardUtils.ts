import { Card } from "../domain/Card";
import type { Suit } from "../domain/Card";
import type { Value } from "../domain/Card";
import type { CardType } from "../domain/Card";
import { RootStore } from "../RootStore";

export function fillDeck(){
  const CARDS: Card[] = []
  const cardValues: Value[] = 
  ["2", "3", "4", "5", "6", "7", "8", 
  "9","T", "J", "Q", "K", "A"];
  const cardSuits: Suit[] = 
  ["S", "C", "H", "D"];
  cardValues.map((v)=>{
    cardSuits.map((s)=>{
      const cardType: CardType = `${v}${s}`;
      const newCard = new Card(cardType);

      CARDS.push(newCard)
    })
  })
  shuffleArray(CARDS)
  return CARDS
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function shuffleArray(array: Card[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export function calculateScoreFromCards(cards: Card[]) {
  let value = 0;
  let secondValue = 0;

  cards.forEach((item) => {
    const val = item.card;
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
  playerScore: { first: number, second: number },
  dealerScore: { first: number, second: number }
  ): "Win" | "Lose" | "Push" {
  let result: "Win" | "Lose" | "Push" = "Lose";

  if ((playerScore.first <= 21 && playerScore.first > dealerScore.first) || (dealerScore.first > 21 && playerScore.first <= 21) &&
      (playerScore.first <= 21 && playerScore.first > dealerScore.second) || (dealerScore.second > 21 && playerScore.first <= 21)) {
    result = "Win";
  } else if (playerScore.first === dealerScore.first) {
    result = "Push";
  } else {
    result = "Lose";
  }
  if(playerScore.first !== playerScore.second && playerScore.first > 21){
    if ((playerScore.second <= 21 && playerScore.second > dealerScore.first) || (dealerScore.first > 21 && playerScore.second <= 21) &&
        (playerScore.second <= 21 && playerScore.second > dealerScore.second) || (dealerScore.second > 21 && playerScore.second <= 21)){
      result = "Win";
    } else if ((playerScore.second === dealerScore.second) || (playerScore.second === dealerScore.first)) {
      result = "Push";
    } else {
      result = "Lose";
    }
  }
  return result;
}

 export function shouldDraw(rootStore: RootStore){
  const dealerFirst = rootStore.dealer.score.first;
  const dealerSecond = rootStore.dealer.score.second;

  const a = dealerFirst < 17;
  const b = (dealerFirst > 21 && dealerSecond < 21 && dealerSecond < 17);
  let correct = a;
  if(!a && b){
    correct = b;
  }
  return correct;
 }