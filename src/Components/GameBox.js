import React, { useEffect, useState } from "react"
import Cell from "./Cell"

import Styles from"./Styles/GameBox.module.css"

import { calculateNextStep,width,height,delayConst } from "../helpers";


const GameBox = ()=>{
    //10x10 grid
    const [snake,setSnake] = useState([[0,0],[1,0]])
    const [board,setBoard] = useState([...Array(height)].map((row,rowi)=> [...Array(width)].map((col,coli)=>0)))
    const [dir,setDir] = useState([1,0])

    useEffect(()=>{
        const keyToDir = {
            "ArrowUp":[0,-1],
            "ArrowDown":[0,1],
            "ArrowLeft":[-1,0],
            "ArrowRight":[1,0]
        }
        const keyDownHandler = (e) => {
            if(Object.keys(keyToDir).filter(x=>x==e.key).length===0)
            {
                return
            }
            
            const dirToSet = keyToDir[e.key]
            const lastHead = snake[snake.length-1]
            const nextHead = calculateNextStep(lastHead,dirToSet)

            const matchingPartOfSnake = snake.filter(x=>x[0]===nextHead[0] && x[1]===nextHead[1])

            setDir((oldDir)=>{
                if(matchingPartOfSnake.length===0)
                {
                    return dirToSet
                }
                return oldDir
            })
        }
        window.addEventListener('keydown',keyDownHandler,false);
        return ()=>{window.removeEventListener('keydown',keyDownHandler,false)}
    },[snake])

    useEffect(()=>{
        const intervalID = setInterval(() => {
            setSnake((oldSnake) => {
                var last = oldSnake[oldSnake.length-1];
                var nextStep = calculateNextStep(last,dir);
                
                var newSnake = [...oldSnake]
                newSnake.push(nextStep);
                newSnake.shift();
                return newSnake;
            })
        }, delayConst);
        return ()=>{clearInterval(intervalID)}
    },[dir])

    useEffect(()=>{
        setBoard(
            [...Array(height)].map((col,coli)=> 
                [...Array(width)].map((row,rowi)=>
                    snake.filter(pos => (pos[0]===rowi && pos[1]===coli)).length===0?0:1)
                )
            )

    },[snake])

    return (
    <div className={Styles.GameBox}>
        {[...Array(height)].map((x,row)=>
        (
            <div key={row} className={Styles.GameBoxColumn}>
                {[...Array(width)].map((y,col)=> 
                (
                    <Cell rown={row} coln={col} activated={board[row][col]}key={col}/>
                ))}
            </div>
        ))}
    </div>
    )
}

export default GameBox;