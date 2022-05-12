import { card } from "./types/Types";

export function addCards(){
    const cardTypes = ["hearts", "spades", "clubs", "diamonds"];
    let cardArr: card[] = [];
    for(let i = 2; i <= 14; i++) {    
      let imgSrc = "";
      let value = 0;
      if(i > 10){
        value = 10;
        if(i === 11){ imgSrc = "jack_of_" }
        if(i === 12){ imgSrc = "queen_of_" }
        if(i === 13){ imgSrc = "king_of_" }
        if(i === 14){ 
          imgSrc = "ace_of_" 
          value = 11;
        }
      } else {
        imgSrc = i + "_of_";
        value = i;
      }

      let prev = imgSrc;
      for(let z = 0; z < 4; z++) {
        let newCard = {
          value: value,
          imgSrc: prev + cardTypes[z] + ".png"
        }
        cardArr.push(newCard)
      }
    }
    //shuffle
    cardArr = cardArr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return cardArr;
  }