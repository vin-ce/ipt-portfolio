import React, { useEffect, useState, useRef } from "react"
import classes from "../styles/imgHoverColor.module.styl"

const ImgHoverColor = props => {
  console.log("props.images", props.images)



  return (
    <div className={ classes.container }>
      <img
        onLoad={ props.fadeContentIn }
        className={ classes.imageOne }
        src={ props.images[ 0 ] }></img>
      <img
        onMouseOver={ () => {
          document.querySelector(`.${classes.imageTwo}`).classList.add(classes.fadeIn)
        } }
        onMouseLeave={ () => {
          document.querySelector(`.${classes.imageTwo}`).classList.remove(classes.fadeIn)
        } }
        className={ classes.imageTwo }
        src={ props.images[ 1 ] }></img>
    </div>
  )
}

export default ImgHoverColor