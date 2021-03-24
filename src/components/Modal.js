import React from "react"
import classes from "../styles/modal.module.styl"
import SVG from "react-inlinesvg"

const Modal = (props) => {

  const initiateClose = () => {
    document.querySelector(`.${classes.container}`).classList.add(classes.fadeOut)
    setTimeout(() => {
      props.closeModal()
    }, 250)
  }

  return (
    <div
      className={ classes.container }
    >
      <SVG
        src={ '/img/closeIcon.svg' }
        className={ classes.close }
        onClick={ initiateClose }

      />
      { props.children }
    </div>
  )
}

export default Modal