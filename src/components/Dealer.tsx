import { useStores } from "../stores";
import { observer } from "mobx-react-lite"
import { card } from "./types/Types";

export const Dealer = observer(() => {
    const RootStore = useStores();
    return (
        <>     
        <div className="Player">
            <h2>Dealer</h2>
            <div className="score-container">
                <p>{RootStore.DealerStore.score[0]}</p>
                <p>{(RootStore.DealerStore.score[1] !== RootStore.DealerStore.score[0]) ? RootStore.DealerStore.score[1] : ''}</p>
            </div>
            
            {
            RootStore.DealerStore?.cards?.map((item: card)=>{
                return <img className="card" key={Math.random()} src={require("../img_cards/"+item.imgSrc)} alt={item.imgSrc}></img>
            })}
            <div className="flipped-card"></div>           
        </div>
        </>
     );   
})