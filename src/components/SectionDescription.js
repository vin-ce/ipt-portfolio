import React from "react"
import classes from "../styles/sectionDescription.module.styl"
import Modal from "./Modal"
import { toHTML } from "../utils/utils"

const SectionDescription = (props) => {

  // fades in image after it loads
  const fadeIn = (e) => {
    e.target.classList.add(classes.fadeIn)
  }

  return (
    <Modal closeModal={ props.closeModal }>
      <div className={ classes.container }>
        <div className={ classes.textContainer }>
          <h1><span>{ props.data.section_name }</span></h1>
          <div className={ classes.descriptionContainer } dangerouslySetInnerHTML={ { __html: toHTML(props.data.section_description) } } />
        </div>
        <img onLoad={ fadeIn } src={ props.data.section_image } />
      </div>
    </Modal>
  )
}

export default SectionDescription