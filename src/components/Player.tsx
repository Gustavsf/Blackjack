import { observer } from "mobx-react-lite"
import { useStores } from "../stores";
import { card } from "./types/Types";

export const Player = observer(() => {
      const RootStore = useStores();
       
      const handleClick = (type: string) => {
        switch(type) {
          case 'start':
            RootStore.CardStore.clearHands();
            RootStore.PlayerStore.addCardToHand(2);
            RootStore.DealerStore.addCardToHand(1);
            break;
          case 'hit':
            RootStore.PlayerStore.addCardToHand();
            break;
          case 'stand':
            RootStore.DealerStore.addCardToHand(1);
            while(RootStore.CardStore.shouldDraw()){
              RootStore.DealerStore.addCardToHand();
            }
          break;
          case 'split':
            RootStore.PlayerStore.addSplitCards();
            break;
          case 'hitSplit':
            RootStore.PlayerStore.addCardToSplitHand();
            break;
          default:
        }
      }
      
      return (
        <div className="Player">
          <h2>User</h2>         
          <div id="all-card-container">   

            <div id="card-container">
              <div className="score-container">
                <p>{RootStore.PlayerStore.score[0]}</p>
                <p>{(RootStore.PlayerStore.score[1] !== RootStore.PlayerStore.score[0]) ? RootStore.PlayerStore.score[1] : ''}</p>
              </div>

              {RootStore.PlayerStore.cards.map((item: card) => {
                return <img className="card" key={Math.random()} src={require("../img_cards/"+item.imgSrc)} alt={item.imgSrc}></img>
              })}

              <div id="btn_action">
                <button onClick={()=>handleClick("start")}>New hand</button>
                <button onClick={()=>handleClick("hit")}>Hit</button>
                <button onClick={()=>handleClick("stand")}>Stand</button>
                <button onClick={()=>handleClick("split")}>Split</button>
              </div>
            </div>
                  
            {RootStore.PlayerStore.isSplit ?
            <div id="split-card-container">
              <div className="score-container">
                <p>{RootStore.PlayerStore.splitScore[0]}</p>
                <p>{(RootStore.PlayerStore.splitScore[1] !== RootStore.PlayerStore.splitScore[0]) ? RootStore.PlayerStore.splitScore[1] : ''}</p>
              </div>
              
              {RootStore.PlayerStore.splitCards.map((item: card) => {
                return <img className="card" key={Math.random()} src={require("../img_cards/"+item.imgSrc)} alt={item.imgSrc}></img>
              })}

              <div id="btn_action">
                <button onClick={()=>handleClick("hitSplit")}>Hit</button>
                <button onClick={()=>handleClick("stand")}>Stand</button>
              </div>
            </div>         
            : ''}

            </div>
        </div>
      );
})
