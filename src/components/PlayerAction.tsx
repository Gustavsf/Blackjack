import * as React from 'react'
type ActionOverlay = "none" | "grid";

interface BetProps {
    actionOverlay: ActionOverlay
}

export const PlayerActionOverlay = (props: BetProps) => {
    const handleClick = React.useCallback((arg: string, count = 0) => {
        switch (arg) {
          case "hit":
              postMessage("addCardOnClick");
              postMessage("playerAction");
            break;
          case "split":
              postMessage("splitOnClick");
              postMessage("playerAction");
            break;
          case "double":
              postMessage("doubleOnClick");
              postMessage("playerAction");
            break;
          case "stay":
              postMessage("stayOnClick");
              postMessage("playerAction");
            break;
          default:
            break;
        }
      }, [])

    return (
        <div id="player-action-overlay" style={{display: props.actionOverlay}}>
            <button id="hit-btn" onClick={()=>handleClick("hit")}>Hit</button>
            <button id="split-btn" onClick={()=>handleClick("split")}>Split</button>
            <div></div>
            <button id="stay-btn" onClick={()=>handleClick("stay")}>Stay</button>
            <button id="double-btn" onClick={()=>handleClick("double")}>Double</button>
        </div>
    )
}