import React from "react"
import Layout from "./Layout"
import { toHTML } from "../utils/utils"
import aboutData from "../../content/sections/about.json"
import contactData from "../../content/sections/contact.json"
import classes from "../styles/about.module.styl"
import Modal from "./Modal"
import SVG from 'react-inlinesvg'

const About = props => {

  let loadedImages = 0
  const fadeIn = (e) => {
    // e.target.classList.add(classes.fadeIn)
    // loadedImages++
    // if (loadedImages == aboutData.certifications_images.length)
    //   props.fadeDescriptionIn()
  }

  props.fadeDescriptionIn()

  let images = []
  aboutData.certifications_images.forEach((object, index) => {
    const imageSrc = object.image
    const url = object.url

    images.push(
      <a
        key={ `image_${index}` }
        href={ url }
        target="_blank" rel="noreferrer noopener"
      >
        <img onLoad={ fadeIn } src={ imageSrc } />
      </a>
    )
  })

  let icons = []
  contactData.external_contact_methods.forEach((object, index) => {
    const iconSrc = object.icon
    const url = object.url

    icons.push(
      <a
        key={ `image_${index}` }
        href={ url }
        target="_blank" rel="noreferrer noopener"
      >
        <SVG src={ iconSrc } className={ classes.icon } />
      </a>
    )
  })

  console.log('ABOUT', aboutData.description)

  return (
    // <Modal closeModal={ props.closeModal }>
    // <div className={ classes.container }>
    [
      <span key="contact">
        <span className={ classes.descriptionContainer } key="description container">
          {/* <div className={ classes.description } dangerouslySetInnerHTML={ { __html: toHTML(aboutData.description) } } /> */ }
          {/* <div className={ classes.aboutDescription }>
          </div> */}
          <div>
            <div className={ classes.certificationContainer }>
              <span className={ classes.organisation }>Architectural Designers New Zealand</span>
              <span className={ classes.qualification }>Professional Member</span>
            </div>
            <div className={ classes.certificationContainer }>
              <span className={ classes.organisation }>NZGBC</span>
              <span className={ classes.qualification }>Homestar Practioner</span>
            </div>
            <div className={ classes.certificationContainer }>
              <span className={ classes.organisation }>Liscenced Building Practitioners</span>
              <span className={ classes.qualification }>Design 2</span>
            </div>
          </div>
          {/* <div className={ classes.iconsContainer }>{ images }</div> */ }
        </span>
        <div className={ classes.contact }>
          <span className={ classes.inTouch }>Get in touch</span> by emailing us at:
          <br />
          <a className={ classes.email } href="mailto:sean.wang@iptcreative.co.nz">sean.wang@iptcreative.co.nz</a>
          <div className={ classes.iconsContainer }>{ icons }</div>

        </div>

      </span>, <span />
    ]

    // </div>
    // </Modal>
  )
}

export default About

