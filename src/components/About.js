import React from "react"
import Layout from "./Layout"
import { toHTML } from "../utils/utils"
import aboutData from "../../content/sections/about.json"
import contactData from "../../content/sections/contact.json"
import classes from "../styles/about.module.styl"
import Modal from "./Modal"
import SVG from 'react-inlinesvg'

const About = props => {


  const fadeIn = (e) => {
    e.target.classList.add(classes.fadeIn)
  }

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

  return (
    <Modal closeModal={ props.closeModal }>
      <div className={ classes.container }>
        <h1>About</h1>
        <div dangerouslySetInnerHTML={ { __html: toHTML(aboutData.description) } } />
        {/* <div className={ classes.aboutDescription }>
        </div> */}
        <div className={ classes.iconsContainer }>{ images }</div>

        <div className={ classes.contact }>
          <span className={ classes.inTouch }>Get in touch</span> by emailing us at:
              <br />
          <a className={ classes.email } href="mailto:sean.wang@iptcreative.co.nz">sean.wang@iptcreative.co.nz</a>.

        </div>

        <div className={ classes.iconsContainer }>{ icons }</div>

      </div>
    </Modal>
  )
}

export default About
