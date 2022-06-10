import * as React from 'react'
type BetOverlay = "none" | "flex";
interface BetProps {
    addBetOverlay: BetOverlay
}
export const AddBetOverlay = (props: BetProps) => {
    const [selected, setSelected] = React.useState<number>(1);
    const handRef: React.RefObject<HTMLDivElement> = React.createRef();
    React.useEffect(()=>{
      handRef.current?.children[0].classList.remove("hand-isSelected")
      handRef.current?.children[1].classList.remove("hand-isSelected")
      handRef.current?.children[2].classList.remove("hand-isSelected")

      handRef.current?.children[selected-1].classList.add("hand-isSelected")
    }, [selected])

    const handleClick = React.useCallback((arg: string, count = 0) => {
        switch (arg) {
          case "handCount":
              postMessage("handcount-" + count)
              setSelected(count);
            break;
          default:
            if(["10","20","40","80","100"].includes(arg)){
              postMessage("addBetOnClick-" + arg);
            }
            break;
        }
    }, [])

    return (
        <div id="addBet-overlay" style={{display: props.addBetOverlay}}>
        <h2>ADD BET</h2>
        <h3>HANDS</h3>
        <div id='select-hands-div' ref={handRef}>
          <button onClick={()=>handleClick("handCount", 1)}>I</button>
          <button onClick={()=>handleClick("handCount", 2)}>II</button>
          <button onClick={()=>handleClick("handCount", 3)}>III</button>
        </div>
        <button className="tokens" style={{backgroundColor:"orange"}} onClick={()=>handleClick("10")}>10</button>
        <button className="tokens" style={{backgroundColor:"red"}} onClick={()=>handleClick("20")}>20</button>
        <button className="tokens" style={{backgroundColor:"green"}} onClick={()=>handleClick("40")}>40</button>
        <button className="tokens" style={{backgroundColor:"blue"}} onClick={()=>handleClick("80")}>80</button>
        <button className="tokens" style={{backgroundColor:"black"}} onClick={()=>handleClick("100")}>100</button>
      </div>
    )
}