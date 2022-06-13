import * as React from 'react'
type BetOverlay = "none" | "grid";
interface BetProps {
    addBetOverlay: BetOverlay
}
export const AddBetOverlay = (props: BetProps) => {
    const handRef: React.RefObject<HTMLDivElement> = React.useRef(null);
    const tokenRef: React.RefObject<HTMLDivElement> = React.useRef(null);
    const [activeHands, setActiveHands] = React.useState<number[]>([]);
    
    let bets = {
      first: "0",
      second: "0",
      third: "0"
    }

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
      //bad
      const tokens = document.getElementsByClassName('tokens')
      for(let i = 0; i< tokens.length;i++){
        tokens[i].classList.remove("token-onselect")
      }
    }
    const tokenOnSelect = (e: any) => {
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
    const tokenConfig = [["orange", "10"],["red", "20"],["green", "40"],["blue", "80"],["black", "100"]]
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
            {[1,2,3].map(num=>{
              let disp = "none"
              if(activeHands.includes(num)){
                disp = "relative"
                return(
                  <div className="token-div" key={num+100} style={{display:disp}} >
                    {[0,1,2,3,4].map((item)=>{
                      return <button className="tokens" key={item+101} style={{backgroundColor: tokenConfig[item][0]}} onClick={(e)=>{
                        handleClick(tokenConfig[item][1]+"-"+num)
                        tokenOnSelect(e)
                      }}>{tokenConfig[item][1]}</button>
                    })}
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