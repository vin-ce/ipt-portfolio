import React, { useState } from "react"

import Carousel from './Carousel'
import About from "./About"

import classes from "../styles/mobile.module.styl"
import SVG from "react-inlinesvg"
import frontPageData from "../../content/sections/front_page.json"
import logo_data from "../../content/sections/logo.json"
import categories_data from "../../content/sections/categories.json"
import about_data from "../../content/sections/about.json"
import contact_data from "../../content/sections/contact.json"
import { toHTML } from '../utils/utils'

const Mobile = props => {

  const [ isMenu, setIsMenu ] = useState(false)
  const [ curSelectedInfo, setCurSelectedInfo ] = useState('Home')

  const TRANSITION_TIME = 250

  // ------------------------
  // INFO

  const homeInfo = (
    <div className={ classes.descriptionContainer }>
      <h1>
        <span className={ classes.orange }>I</span>nnovation.&nbsp;
        <span className={ classes.orange }>P</span>rocess.&nbsp;
        <span className={ classes.orange }>T</span>enacity.&nbsp;
      </h1>

      <Carousel
        fadeDescriptionIn={ fadeDescriptionIn }
        images={
          [
            {
              section_image: frontPageData.front_page_images[ 0 ].image,
              caption: frontPageData.front_page_images[ 0 ].caption
            }
          ]
        }
      />

      <p key="description" className={ classes.description }>{ frontPageData.company_description } </p>
    </div>
  )

  const [ info, setInfo ] = useState(homeInfo)

  function fadeDescriptionIn () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.remove(classes.fadeOut)
  }

  function fadeDescriptionOut () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.add(classes.fadeOut)
  }


  const switchInfo = (data) => {

    if (data.section_name === curSelectedInfo) return
    setCurSelectedInfo(data.section_name)
    closeMenu()


    if (data.section_name === 'Home') {
      fadeDescriptionOut()
      setTimeout(() => {
        setInfo(homeInfo)
      }, TRANSITION_TIME)

    } else if (data.section_name === 'About') {

      // --------------------
      // ABOUT PAGE

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
      about_data.certifications.forEach((object, index) => {
        certifications.push(
          <div key={ `certifications-${index}` } className={ classes.sectionContainer }>
            <a className={ classes.title } href={ object.url } target="_blank" rel="noreferrer noopener">{ object.organisation }</a>
            <span className={ classes.detail }>{ object.qualification }</span>
          </div>
        )
      })

      fadeDescriptionOut()
      setTimeout(() => {
        setInfo(
          <div className={ classes.descriptionContainer }>
            <h1>About</h1>

            <Carousel
              fadeDescriptionIn={ fadeDescriptionIn }
              images={
                [
                  {
                    section_image: about_data.office_image,
                    // caption: frontPageData.front_page_images[ 0 ].caption
                  }
                ]
              }
            />

            <div className={ classes.certificationsContainer }>
              { certifications }
            </div>

            <div className={ classes.sectionContainer }>
              <span className={ classes.title }>Get in touch by emailing us at:</span>
              <a className={ classes.detail } href={ `mailto:${contact_data.email}` }>{ contact_data.email }</a>
            </div>

            <div className={ classes.sectionContainer }>
              <span className={ classes.title }>Phone</span>
              <span className={ classes.detail }>{ contact_data.phone }</span>
            </div>

            <div className={ classes.iconsContainer }>{ icons }</div>

          </div>
        )
      }, TRANSITION_TIME)


    } else {
      fadeDescriptionOut()

      setTimeout(() => {
        setInfo(

          <div className={ classes.descriptionContainer }>
            <h1>{ data.section_name }</h1>

            <Carousel
              fadeDescriptionIn={ fadeDescriptionIn }
              images={ data.section_images }
              isMobile={ true }
            />

            <div key="description" className={ classes.description } dangerouslySetInnerHTML={ { __html: toHTML(data.section_description) } } />

          </div>

        )
      }, TRANSITION_TIME)
    }

  }


  // ------------------------
  // MENU 


  const openMenu = () => {
    setIsMenu(true)
    document.querySelector(`.${classes.menuContainer}`).classList.add(classes.fadeIn)
  }

  const closeMenu = () => {
    // first setTimeout allows for content on the bottom to fade first
    setTimeout(() => {
      document.querySelector(`.${classes.menuContainer}`).classList.remove(classes.fadeIn)
      setTimeout(() => {
        setIsMenu(false)
      }, TRANSITION_TIME)
    }, TRANSITION_TIME)

  }

  let sections = []


  categories_data.category_items.forEach((section, sectionIndex) => {

    let sectionEl

    const sectionClasses = [ classes.section ]
    if (curSelectedInfo === section.section_name) sectionClasses.push(classes.selected)

    sectionEl = (

      <span
        id={ `s-${sectionIndex}` }
        key={ `s-${sectionIndex}` }
        name={ section.section_name }
        className={ sectionClasses.join(" ") }
        onClick={ e => {
          e.stopPropagation()
          switchInfo(section)
        } }
      >
        {/* <SVG src={ section.section_icon } className={ classes.sectionIcon } /> */ }
        { section.section_name }
      </span >
    )

    sections.push(sectionEl)

  })



  let menuHomeClasses = [ classes.menuHome, classes.section ]
  if (curSelectedInfo === 'Home') menuHomeClasses.push(classes.selected)
  sections.push(
    <div
      className={ menuHomeClasses.join(' ') }
      key={ 'Home' }
      onClick={ e => {
        e.stopPropagation()
        switchInfo({ section_name: 'Home' })
      } }
    >
      Home
    </div>
  )


  let menuAboutClasses = [ classes.menuAbout, classes.section ]
  if (curSelectedInfo === 'About') menuAboutClasses.push(classes.selected)
  sections.push(
    <div
      className={ menuAboutClasses.join(' ') }
      key={ 'About' }
      onClick={ e => {
        e.stopPropagation()
        switchInfo({ section_name: 'About' })
      } }
    >
      About
    </div>
  )


  return (
    <div className={ classes.mobile }>


      <div
        className={ classes.menuContainer }
        onClick={ closeMenu }
      >
        <div className={ classes.menuItemsContainer }>
          { sections }
        </div>
      </div>

      <nav>
        <SVG
          className={ classes.logo }
          src={ logo_data.logo_image }
          onClick={ () => {
            if (curSelectedInfo !== 'Home')
              switchInfo({ section_name: 'Home' })
          } }
        />
        <div onClick={ openMenu }>Menu</div>
      </nav>

      { info }

    </div>
  )
}

export default Mobile