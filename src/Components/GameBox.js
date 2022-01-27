import React, { useEffect, useState } from 'react'
import GContainer from './GContainer';

import Styles from './Styles/GameBox.module.css'

const GameBox = (props)=>{

    const board = props.board

    const gameOver = props.gameOver;

    let gameBoxToReturn;
    if (gameOver)
    {
        gameBoxToReturn = <GContainer contentType={3}/>
    }else{
        gameBoxToReturn = board.map((x,row)=>
        (
            <div key={row} className={Styles.GameBoxColumn}>
                {x.map((y,col)=> 
                (
                    <GContainer contentType={y} key={col}/>
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