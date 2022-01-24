import React, { useState } from "react"

import Cell from "./Cell"

import Styles from"./Styles/GameBox.module.css"

const GameBox = ()=>{
    //10x10 grid
    const [snake,setSnake] = useState([...Array(10)].map(x=>[...Array(10)].map(y=>0)))
    

    const handleClick= (row,col)=>{
        setSnake(snake.map((x,i)=> {
            if(i==row)
            {
                x[col]=x[col]?0:1;
            }
            return x;
        }));
    }

    return (
    <div className={Styles.GameBox}>
        {[...Array(10)].map((x,row)=>
        (
            <div key={row} className={Styles.GameBoxColumn}>
                {[...Array(10)].map((y,col)=> 
                (
                    <Cell onClick={function(){handleClick(row,col)}} rown={row} coln={col} activated={snake[row][col]}key={col}/>
                ))}
            </div>
        ))}
    </div>
    )
}

export default GameBox;