import React from "react"
import classes from "../styles/button.module.styl"
import SVG from "react-inlinesvg"

const Button = props => {

  return (
    <div onClick={ props.onClick } className={ classes.button }>
      <SVG className={ classes.icon } src={ props.iconSrc } />
      <span className={ classes.name }>{ props.name }</span>
    </div>
  )
}

export default Button