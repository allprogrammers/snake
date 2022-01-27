import { calculateNextStep, width } from "../generalHelpers";

export const keyToDir = {
    'ArrowUp':[0,-1],
    'ArrowDown':[0,1],
    'ArrowLeft':[-1,0],
    'ArrowRight':[1,0]
}

export function generateNewBoard(width,height)
{
    return [...Array(height)].map((col,coli)=> [...Array(width)].map((row,rowi)=>0));
}

export function placeSnakeOnBoard(board,snake){
    snake.forEach(x=>{board[x[1]][x[0]]=1})
    return board
}

export function placeFoodOnBoard(board,food){
    board[food[1]][food[0]]=2
    return board
}

export function snakeAteFood(snake,food){
    const snakeHead = snake[snake.length-1]
    return snakeHead[0]===food[0] && snakeHead[1]===food[1]
}

export function snakeAteSelf(snake){
    let snakeHead = snake[snake.length-1]
    let remainingSnake = [...snake]
    remainingSnake.pop()
    let bite = remainingSnake.filter(x=>x[0]==snakeHead[0]&&snakeHead[1]==x[1])
    
    return bite.length!==0
}

export function newFoodLocation(board,width,height)
{
    let newFood;
    do
    {
        newFood = [Math.round(Math.random()*(width-1)),Math.round(Math.random()*(height-1))];
    }while(board[newFood[1]][newFood[0]]===1)
    return newFood
}

export function pressedGoodKey(GoodKeys,pressedKey)
{
    return GoodKeys.filter(x=>x===pressedKey).length!==0
}