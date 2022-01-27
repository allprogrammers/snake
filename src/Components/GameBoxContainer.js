import React, {useState,useEffect} from "react";
import GameBox from "./GameBox";

import * as GBHelpers from "./GameBoxHelpers"

import { calculateNextStep,width,height,delayConst} from '../generalHelpers';

const GameBoxContainer = ()=>{
    const [snake, setSnake] = useState([[0,0],[1,0],[2,0]])
    const [board, setBoard] = useState([...Array(height)].map((col,coli)=> [...Array(width)].map((row,rowi)=>0)))
    const [direction, setDirection] = useState([1,0])
    const [food, setFood] = useState([width-1,height-1])
    const [gameOver, setGameOver] = useState(0)


    useEffect(()=>{
        let newBoard = GBHelpers.generateNewBoard(width,height);

        newBoard = GBHelpers.placeSnakeOnBoard(newBoard,snake);
        newBoard = GBHelpers.placeFoodOnBoard(newBoard,food);
        
        setBoard(newBoard)
        
    },[snake])

    useEffect(()=>{
        if(!GBHelpers.snakeAteFood(snake,food)){return}

        setFood(GBHelpers.newFoodLocation(board,width,height))
        const snakeHead = snake[snake.length-1]
        const snakeSecondLast = snake[snake.length-2]
        const remaingSnake = snake.slice(0,snake.length-2)
        setSnake([...remaingSnake,snakeSecondLast,snakeSecondLast,snakeHead])

    },[snake])

    useEffect(()=>{
        if(!GBHelpers.snakeAteSelf(snake)){return}
        
        setDirection([0,0])

    },[snake])

    useEffect(()=>{
        const keys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
        const directions = [[0,-1],[0,1],[-1,0],[1,0]]
        
        const keyToDirection = {}
        
        keys.forEach((key,i)=>keyToDirection[key]=directions[i])

        const keyDownHandler = (e) => {
            if(!GBHelpers.pressedGoodKey(keys,e.key))
            {
                return
            }
            const directionToSet = keyToDirection[e.key]

            if(GBHelpers.goingBack(snake,directionToSet)){return}
            
            setDirection(directionToSet)
        }
        window.addEventListener('keydown',keyDownHandler,false);

        return ()=>{window.removeEventListener('keydown',keyDownHandler,false)}
    },[snake])

    useEffect(()=>{
        
        if(direction[0]===0 && direction[1]===0)
        {
            setGameOver(1)
        }
        const intervalID = setInterval(() => {
            setSnake((oldSnake) => {
                const last = oldSnake[oldSnake.length-1];
                const nextStep = calculateNextStep(last,direction);
                
                const newSnake = [...oldSnake]
                newSnake.push(nextStep);
                newSnake.shift();
                return newSnake;
            })
        }, Math.floor(delayConst-(delayConst*1.0)/(width*height)*snake.length));
        
        return ()=>{clearInterval(intervalID)}
    },[direction,snake])

    return <GameBox board={board} gameOver={gameOver}/>
}

export default GameBoxContainer;