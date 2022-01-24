import React, { useEffect, useState } from "react"

import Cell from "./Cell"

import Styles from"./Styles/GameBox.module.css"

const width = 10;
const height = 10;

const GameBox = ()=>{
    //10x10 grid
    const [snake,setSnake] = useState([[0,0]])
    const [board,setBoard] = useState([...Array(height)].map((row,rowi)=> [...Array(width)].map((col,coli)=>0)))
    const [xdir,setxdir] = useState(1)
    const [ydir,setydir] = useState(0)

    useEffect(()=>{
        const intervalID = setInterval(() => {
            setSnake((oldSnake) => {
                var last = oldSnake[oldSnake.length-1];
                var nextStep = [last[0]+ydir,last[1]+xdir];
                var newSnake = [...oldSnake]
                newSnake.push(nextStep);
                newSnake.shift();
                return newSnake;
            })
        }, 500);
        return ()=>{clearInterval(intervalID)}
    },[])

    useEffect(()=>{
        setBoard(
            [...Array(height)].map((row,rowi)=> 
                [...Array(width)].map((col,coli)=>
                    snake.filter(pos => (pos[0]===rowi && pos[1]===coli)).length===0?0:1)
                )
            )

    },[snake])

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