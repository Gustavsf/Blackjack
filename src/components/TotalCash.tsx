import * as React from 'react'

interface CashProps{
    money: number
}

export const Cash = (props: CashProps) => {  
    return(
        <>
        {props.money !== 0 ? 
            <div id='total-cash'>
              <p>Total amount: {props.money}</p>
            </div>  
        : ""}
        </>
    )
}