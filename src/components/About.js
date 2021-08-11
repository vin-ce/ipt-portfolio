import React from "react"
import { toHTML } from "../utils/utils"
import aboutData from "../../content/sections/about.json"
import contact_data from "../../content/sections/contact.json"
import classes from "../styles/about.module.styl"
import SVG from 'react-inlinesvg'

const About = props => {

  let loadedImages = 0
  const fadeIn = (e) => {
    // e.target.classList.add(classes.fadeIn)
    // loadedImages++
    // if (loadedImages == aboutData.certifications_images.length)
    //   props.fadeDescriptionIn()
  }


  // let images = []
  // aboutData.certifications_images.forEach((object, index) => {
  //   const imageSrc = object.image
  //   const url = object.url

  //   images.push(
  //     <a
  //       key={ `image_${index}` }
  //       href={ url }
  //       target="_blank" rel="noreferrer noopener"
  //     >
  //       <img onLoad={ fadeIn } src={ imageSrc } />
  //     </a>
  //   )
  // })

  let icons = []
  contact_data.external_contact_methods.forEach((object, index) => {
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

  let certifications = []
  aboutData.certifications.forEach((object, index) => {
    // const url = object.url
    certifications.push(
      <div key={ `certifications-${index}` } className={ classes.sectionContainer }>
        <a className={ classes.title } href={ object.url } target="_blank" rel="noreferrer noopener">{ object.organisation }</a>
        <span className={ classes.detail }>{ object.qualification }</span>
      </div>
    )
  })

  return (
    [
      <span key="contact" className={ classes.contactContainer }>
        <div className={ classes.certificationsContainer } key="description container">
          { certifications }
        </div>

        <div className={ classes.sectionContainer }>
          <a href={ `mailto:${contact_data.email}` } className={ classes.title }>Get in touch by emailing us at:</a>
          <span className={ classes.detail } >{ contact_data.email }</span>
        </div>

        <div className={ classes.sectionContainer }>
          <a href={ `tel:${contact_data.phone}` } className={ classes.title }>Phone</a>
          <span className={ classes.detail }>{ contact_data.phone }</span>
        </div>

        {/* <div className={ classes.additionalInformation } dangerouslySetInnerHTML={ { __html: toHTML(contact_data.additional_information) } } /> */ }

        <div className={ classes.iconsContainer }>{ icons }</div>


      </span>, <img key={ `about-image` } onLoad={ props.fadeDescriptionIn } src={ aboutData.office_image } />
    ]

  )
}

export default About

