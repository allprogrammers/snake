import React, { useState } from "react"

import Cell from "./Cell"

import Styles from"./Styles/GameBox.module.css"

const width = 10;
const height = 10;

const GameBox = ()=>{
    //10x10 grid
    const [board,setBoard] = useState([...Array(height)].map(x=>[...Array(width)].map(y=>0)))
    
    

    const handleClick= (row,col)=>{
        setBoard(board.map((x,i)=> {
            if(i==row)
            {
                x[col]=x[col]?0:1;
            }
            return x;
        }));
    }


    return (
    <div className={Styles.GameBox}>
        {[...Array(height)].map((x,row)=>
        (
            <div key={row} className={Styles.GameBoxColumn}>
                {[...Array(width)].map((y,col)=> 
                (
                    <Cell onClick={function(){handleClick(row,col)}} rown={row} coln={col} activated={board[row][col]}key={col}/>
                ))}
            </div>
        ))}
    </div>
    )
}

export default GameBox;