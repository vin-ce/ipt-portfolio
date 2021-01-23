import React from "react"
import classes from "../styles/button.module.styl"
import SVG from "react-inlinesvg"

const Button = props => {

  const buttonClasses = [classes.button]
  if (props.className) buttonClasses.push(props.className)

  return (
    <div onClick={ props.onClick } className={ buttonClasses.join(' ') }>
      <SVG onClick={ e => e.stopPropagation() } className={ classes.icon } src={ props.iconSrc } />
      <span className={ classes.name }>{ props.name }</span>
    </div>
  )
}

export default Button