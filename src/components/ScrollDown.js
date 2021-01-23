import React from "react"
import classes from "../styles/scrollDown.module.styl"

import SVG from "react-inlinesvg"
import scrollTo from 'gatsby-plugin-smoothscroll';

const ScrollDown = props => {

  const onScrollArrowClick = (e) => {
    console.log(props.scrollToId)
    scrollTo(`#${props.scrollToId}`)
    e.target.classList.add(classes.invisible)
  }

  const hideScrollArrow = () => {
    if (document.querySelector(`.${classes.icon}`).classList.contains(classes.invisible)) window.removeEventListener('scroll', hideScrollArrow)
    else document.querySelector(`.${classes.icon}`).classList.add(classes.invisible)

  }

  // on scroll hide scroll arrow
  window.addEventListener('scroll', hideScrollArrow)

  return (
    <span className={ classes.icon } onClick={ onScrollArrowClick }>
      <SVG src="/img/arrow-circle-down-light.svg" />
    </span>
  )
}

export default ScrollDown