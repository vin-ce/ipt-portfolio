import React from "react"
import classes from "../styles/button.module.styl"

const Button = props => {

  return (
    <div onClick={ props.onClick } className={ classes.button }>
      <span className={ classes.icon }>{ props.icon }</span>
      <span className={ classes.name }>{ props.name }</span>
    </div>
  )
}

export default Button