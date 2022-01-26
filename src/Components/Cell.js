import React from "react"
import Styles from "./Styles/Cell.module.css"

const Cell = (props) => {
    let liClasses = [Styles.Cell]
    liClasses.push(props.activated?Styles.active:Styles.inactive)

    return (<div className={liClasses.join(" ")}></div>)
}

export default Cell;