import React, { useEffect, useState } from "react"
import classes from "../styles/carousel.module.styl"

// import { setConfig } from 'react-hot-loader';
// setConfig({ pureSFC: true });

// props expecting:
// fadeDescriptionIn={ fadeDescriptionIn }
// images={ data.section_images }
const Carousel = props => {
  const [ imageIndex, setImageIndex ] = useState(0)

  // resets things between different categories
  // by detecting change in props (i.e data)
  useEffect(() => {
    props.fadeDescriptionIn()
    setImageIndex(0)
    if (props.isMobile) {
      document.querySelector(`.${classes.captionContainer}`).style.marginLeft = "0"
    }
  }, [ props ])


  const TRANSITION_TIME = 200
  const next = e => {
    if (props.images.length === 1) return

    document.querySelector(`.${classes.carouselImg}`).classList.add(classes.fadeOut)

    setTimeout(() => {
      if (imageIndex < props.images.length - 1) setImageIndex(imageIndex + 1)
      else setImageIndex(0)
      document.querySelector(`.${classes.carouselImg}`).classList.remove(classes.fadeOut)
    }, TRANSITION_TIME)
  }

  const prev = e => {
    if (props.images.length === 1) return

    document.querySelector(`.${classes.carouselImg}`).classList.add(classes.fadeOut)

    setTimeout(() => {
      if (imageIndex > 0) setImageIndex(imageIndex - 1)
      else setImageIndex(props.images.length - 1)
      document.querySelector(`.${classes.carouselImg}`).classList.remove(classes.fadeOut)
    }, TRANSITION_TIME)

  }

  let carouselClasses = [ classes.imageContainer ]
  if (props.images.length > 1) carouselClasses.push(classes.next)

  // the below is for when switch from
  // image 3/7 in one category to another category
  // allows a cycle for index to reset via useEffect
  let img
  let caption

  if (props.images[ imageIndex ]) {
    img = (
      <img
        onClick={ next }
        className={ classes.carouselImg }
        src={ props.images[ imageIndex ].section_image }
      />
    )

    caption = props.images[ imageIndex ].caption
  }




  return (
    <React.Fragment>

      {/* <div className={ carouselClasses.join(' ') } onClick={ next }> */ }
      { img }
      {/* </div> */ }
      <div className={ classes.captionContainer }>
        { props.images.length > 1 ?

          <div className={ classes.controlsContainer }>
            <span className={ classes.control } onClick={ prev }>&#60;</span>
            <span>&nbsp;{ imageIndex + 1 } / { props.images.length }&nbsp;</span>
            <span className={ classes.control } onClick={ next }>&#62;</span>
          </div>

          : <div /> }

        <div>{ caption }</div>

      </div>
    </React.Fragment>
  )
}

export default Carousel