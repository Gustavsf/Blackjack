import * as React from 'react'
//@ts-ignore
import cardSpriteSheet from "../cardsSpriteSheet.png"

export const Card = (item: string) =>{
    function getCardPos(value: string, type: string){
        const typeArr = ["C","D","H","S"];
        let valuePos: number = 0;
        if(!isNaN(+value)){
          let numValue = parseInt(value);
          valuePos = (numValue-1) * 127;
        } else{
          let faceValue:number = 0;
          switch (value) {
            case "T":
              faceValue = 9;
              break;
            case "J":
              faceValue = 10;
              break;
            case "Q":
              faceValue = 11;
              break;
            case "K":
              faceValue = 12;
              break;
            case "A":
              faceValue = 0;
              break;
            case "*":
              faceValue = 14;
              break;
            default:
              break;
          }
          valuePos = faceValue * 127;
        }
        let typePos: number = 0;
        if(type !== "*"){
            typePos = typeArr.indexOf(type) * 183
        }
        return `-${valuePos+3}px -${typePos+5}px`
      }
    const split = item.split("");
    const cords = getCardPos(split[0], split[1])
    return <img id='testCard' key={cords + Math.random} src={cardSpriteSheet} style={{objectPosition:cords}}></img>
}