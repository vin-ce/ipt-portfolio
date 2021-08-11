import React from "react"
import { toHTML } from "../utils/utils"
import aboutData from "../../content/sections/about.json"
import contactData from "../../content/sections/contact.json"
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

  let certifications = []
  aboutData.certifications.forEach((object, index) => {
    // const url = object.url
    certifications.push(
      <div key={ `certifications-${index}` } className={ classes.certificationContainer }>
        <a className={ classes.organisation } href={ object.url } target="_blank" rel="noreferrer noopener">{ object.organisation }</a>
        <span className={ classes.qualification }>{ object.qualification }</span>
      </div>
    )
  })

  return (
    [
      <span key="contact">
        <div className={ classes.descriptionContainer } key="description container">
          {/* <div className={ classes.aboutDescription }>
          </div> */}
          <div>
            { certifications }
          </div>
          {/* <div className={ classes.iconsContainer }>{ images }</div> */ }
        </div>


        <div className={ classes.contact }>
          <span className={ classes.inTouch }>Get in touch</span> by emailing us at:
          <br />
          <a className={ classes.email } href={ `mailto:${contactData.email}` }>{ contactData.email }</a>
          <div className={ classes.additionalInformation } dangerouslySetInnerHTML={ { __html: toHTML(contactData.additional_information) } } />
          <div className={ classes.iconsContainer }>{ icons }</div>

        </div>

      </span>, <img key={ `about-image` } onLoad={ props.fadeDescriptionIn } src={ aboutData.office_image } />
    ]

  )
}

export default About

