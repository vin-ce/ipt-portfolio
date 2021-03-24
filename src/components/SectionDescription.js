import React from "react"
import classes from "../styles/sectionDescription.module.styl"
import Modal from "./Modal"

const SectionDescription = (props) => {

  // fades in image after it loads
  const fadeIn = (e) => {
    e.target.classList.add(classes.fadeIn)
  }
  return (
    <Modal closeModal={ props.closeModal }>
      <div className={ classes.container }>
        <img onLoad={ fadeIn } src={ props.data.section_item_image } />
        <h1>{ props.data.section_item_name }</h1>
        <p>{ props.data.section_item_description }</p>
      </div>
    </Modal>
  )
}

export default SectionDescription