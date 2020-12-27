import React, { useState } from "react"
import classes from "../styles/modal.module.styl"

const Modal = props => {
  const [imageIndex, setImageIndex] = useState(0)

  const next = e => {
    if (imageIndex < props.images.length - 1) setImageIndex(imageIndex + 1)
    else setImageIndex(0)
  }

  const prev = e => {
    if (imageIndex > 0) setImageIndex(imageIndex - 1)
    else setImageIndex(props.images.length - 1)
  }

  return (
    <React.Fragment>
      <div className={ classes.imageContainer } onClick={ next }>
        { props.images[imageIndex] }
      </div>
      <div className={ classes.controlsContainer }>
        <span className={ classes.control } onClick={ next }>&#60;</span>
        <span>&nbsp;{ imageIndex + 1 } / { props.images.length }&nbsp;</span>
        <span className={ classes.control } onClick={ prev }>&#62;</span>
      </div>
    </React.Fragment>
  )
}

export default Modal