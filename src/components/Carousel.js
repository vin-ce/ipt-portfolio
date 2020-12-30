import React, { useState } from "react"
import classes from "../styles/carousel.module.styl"

const Carousel = props => {
  const [imageIndex, setImageIndex] = useState(0)

  const next = e => {
    if (props.images.length === 1) return
    if (imageIndex < props.images.length - 1) setImageIndex(imageIndex + 1)
    else setImageIndex(0)
  }

  const prev = e => {
    if (props.images.length === 1) return
    if (imageIndex > 0) setImageIndex(imageIndex - 1)
    else setImageIndex(props.images.length - 1)
  }

  let carouselClasses = [classes.imageContainer]
  if (props.images.length > 1) carouselClasses.push(classes.next)

  return (
    <React.Fragment>
      <div className={ carouselClasses.join(' ') } onClick={ next }>
        { props.images[imageIndex] }
      </div>
      {props.images.length > 1 ?

        <div className={ classes.controlsContainer }>
          <span className={ classes.control } onClick={ next }>&#60;</span>
          <span>&nbsp;{ imageIndex + 1 } / { props.images.length }&nbsp;</span>
          <span className={ classes.control } onClick={ prev }>&#62;</span>
        </div>

        : null }
    </React.Fragment>
  )
}

export default Carousel