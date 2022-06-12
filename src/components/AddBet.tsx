import * as React from 'react'
type BetOverlay = "none" | "grid";
interface BetProps {
    addBetOverlay: BetOverlay
}
export const AddBetOverlay = (props: BetProps) => {
    const handRef: React.RefObject<HTMLDivElement> = React.useRef(null);
    const tokenRef: React.RefObject<HTMLDivElement> = React.useRef(null);
    const [stat, setStat] = React.useState<number[]>([1,2,3]);
    const [activeHands, setActiveHands] = React.useState<number[]>([1]);

    let bets = {
      first: "0",
      second: "0",
      third: "0"
    }

    React.useEffect(()=>{
      addClass(1)
    }, [])

    const addClass = (num: number) =>{
      if(handRef.current?.children[num-1].className === "hand-isSelected"){
        handRef.current?.children[num-1].classList.remove("hand-isSelected")
        tokenRef.current?.children[num-1].classList.remove("token-isSelected")
        setActiveHands(activeHands=>activeHands.filter(item=>{
          return item !== num
        }))
      } else {
        handRef.current?.children[num-1].classList.add("hand-isSelected")
        tokenRef.current?.children[num-1].classList.add("token-isSelected")
        setActiveHands(activeHands => [...activeHands, num])
      }
    }
    const clearTokenAnim = () => {
      for(let i = 0; i< 5; i++){
        tokenRef.current?.children[i].classList.remove("token-onselect")
      }
    }
    const tokenOnSelect = (e: any) => {
      clearTokenAnim();
      const btn = e.currentTarget as HTMLButtonElement
      btn.classList.add("token-onselect")
    }

    const handleClick = React.useCallback((arg: string) => {
      const part = arg.split("-")
        switch (part[0]) {
          case "handCount":
              const number = parseInt(part[1])
              postMessage("handcount-" + number)
              addClass(number)
            break;
          case "sendBets":
              if(bets.first !=="0" || bets.second !=="0" || bets.third !=="0"){
                const msg = JSON.stringify(bets)
                postMessage("addBetOnClick-" + msg);
                bets = {
                  first: "0",
                  second: "0",
                  third: "0"
                }
              clearTokenAnim()
              }
            break;
          default:
            if(["10","20","40","80","100"].includes(part[0])){
              if(part[1] === "1"){
                bets.first = part[0]
              }else if(part[1] === "2"){
                bets.second = part[0]
              } else if(part[1] === "3"){
                bets.third = part[0]
              }
            }
            break;
        }
    }, [])

    return (
        <div id="addBet-overlay" style={{display: props.addBetOverlay}}>
          <button id='bets-ready-btn' onClick={()=>handleClick("sendBets")}>READY</button>
          <div className='player-bet-div'>
            <div id='select-hands-div' ref={handRef}>
              <button key={1} onClick={()=>handleClick("handCount-"+1)}>I</button>
              <button key={2} onClick={()=>handleClick("handCount-"+2)}>II</button>
              <button key={3} onClick={()=>handleClick("handCount-"+3)}>III</button>
            </div>
            <div className='select-tokens-div'>
            {stat.map(num=>{
              let disp = "none"
              if(activeHands.includes(num)){
                disp = "relative"
                return(
                  <div className="token-div" key={Math.random()+num} ref={tokenRef} style={{display:disp}} >
                    <button className="tokens" style={{backgroundColor:"orange"}} onClick={(e)=>{
                      handleClick("10-"+num)
                      tokenOnSelect(e)
                    }}>10</button>
                    <button className="tokens" style={{backgroundColor:"red"}} onClick={(e)=>{
                      handleClick("20-"+num)
                      tokenOnSelect(e)
                    }}>20</button>
                    <button className="tokens" style={{backgroundColor:"green"}} onClick={(e)=>{
                      handleClick("40-"+num)
                      tokenOnSelect(e)
                    }}>40</button>
                    <button className="tokens" style={{backgroundColor:"blue"}} onClick={(e)=>{
                      handleClick("80-"+num)
                      tokenOnSelect(e)
                    }}>80</button>
                    <button className="tokens" style={{backgroundColor:"black"}} onClick={(e)=>{
                      handleClick("100-"+num)
                      tokenOnSelect(e)
                    }}>100</button>
                  </div>
                )
              } else {
                return <div key={Math.random() + disp} className="token-div-fake"></div>
              }
            })} 
            </div>
          </div>  
      </div>
    )
}