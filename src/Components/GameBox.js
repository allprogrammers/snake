import React, { useEffect, useState } from 'react'
import GContainer from './GContainer';

import Styles from './Styles/GameBox.module.css'

import { calculateNextStep,width,height,delayConst } from '../helpers';


const GameBox = ()=>{
    const [snake, setSnake] = useState([[0,0],[1,0],[2,0]])
    const [board, setBoard] = useState([...Array(height)].map((col,coli)=> [...Array(width)].map((row,rowi)=>0)))
    const [dir, setDir] = useState([1,0])
    const [food, setFood] = useState([width-1,height-1])
    const [gameOver, setGameOver] = useState(0)


    useEffect(()=>{
        const newBoard = [...Array(height)].map((col,coli)=> [...Array(width)].map((row,rowi)=>0));

        snake.forEach(x=>{newBoard[x[1]][x[0]]=1})

        newBoard[food[1]][food[0]]=2

        setBoard(newBoard)

        const checkFood = ()=>{
            let snakeHead = snake[snake.length-1]
            if(!(snakeHead[0]===food[0] && snakeHead[1]===food[1]))
            {
                return;
            }
            let newFood;
            do
            {
                newFood = [Math.round(Math.random()*(width-1)),Math.round(Math.random()*(height-1))];
            }while(board[newFood[1]][newFood[0]]===1)
            
            setSnake([...snake,food])
            setFood(newFood);
            
            
        };
        checkFood();
    },[snake])

    useEffect(()=>{
        const keyToDir = {
            'ArrowUp':[0,-1],
            'ArrowDown':[0,1],
            'ArrowLeft':[-1,0],
            'ArrowRight':[1,0]
        }
        const keyDownHandler = (e) => {
            if(Object.keys(keyToDir).filter(x=>x==e.key).length===0)
            {
                return
            }
            
            const dirToSet = keyToDir[e.key]
            const lastHead = snake[snake.length-1]
            const secondLastHead = snake[snake.length-2]
            const nextHead = calculateNextStep(lastHead,dirToSet)

            if(secondLastHead[0]===nextHead[0] && secondLastHead[1]===nextHead[1])
            {
                return
            }

            const matchingPartOfSnake = snake.filter(x=>x[0]===nextHead[0] && x[1]===nextHead[1])

            setDir((oldDir)=>{
                if(matchingPartOfSnake.length===0)
                {
                    return dirToSet
                }
                return [0,0]
                
            })
        }
        window.addEventListener('keydown',keyDownHandler,false);
        return ()=>{window.removeEventListener('keydown',keyDownHandler,false)}
    },[snake])

    useEffect(()=>{
        if(dir[0]===0 && dir[1]===0)
        {
            setGameOver(1)
        }
        const intervalID = setInterval(() => {
            setSnake((oldSnake) => {
                const last = oldSnake[oldSnake.length-1];
                const nextStep = calculateNextStep(last,dir);
                
                const newSnake = [...oldSnake]
                newSnake.push(nextStep);
                newSnake.shift();
                return newSnake;
            })
        }, Math.floor(delayConst-(delayConst*1.0)/(width*height)*snake.length));
        return ()=>{clearInterval(intervalID)}
    },[dir,snake])

    let gameBoxToReturn;
    if (gameOver)
    {
        gameBoxToReturn = <GContainer contentType={3}/>
    }else{
        gameBoxToReturn = [...Array(height)].map((x,row)=>
        (
            <div key={row} className={Styles.GameBoxColumn}>
                {[...Array(width)].map((y,col)=> 
                (
                    <GContainer contentType={board[row][col]} key={col}/>
                ))}
            </div>
        ))
    }

    return (
        <div className={Styles.GameBox}>
            {gameBoxToReturn}
        </div>
    )
}

export default GameBox;