import React, { useState, useRef, useEffect } from "react"
import "../styles/styles.styl"
import classes from "../styles/index.module.styl"
import { toHTML } from "../utils/utils"
import SVG from "react-inlinesvg"

import { Helmet } from "react-helmet";

import Layout from "../components/Layout"
import Filters from '../components/Filters'
import Nav from "../components/Nav"
import About from "../components/About"
import Carousel from "../components/Carousel"
import ImgHoverColor from "../components/ImgHoverColor"
import Mobile from "../components/Mobile"

import frontPageData from "../../content/sections/front_page.json"
import categoriesData from "../../content/sections/categories.json"
import logo_data from "../../content/sections/logo.json"
import about_data from "../../content/sections/about.json"

const Home = () => {

  const [ isMobile, setIsMobile ] = useState(false)


  // preloading all images 

  let preLoadedImages = useRef([])

  const preLoadImages = () => {
    categoriesData.category_items.forEach((categoryItem) => {
      categoryItem.section_images.forEach((image) => {
        const img = new Image()
        img.src = image.section_image
        preLoadedImages.current.push(img)
      })
    })

    const aboutImg = new Image()
    aboutImg.src = about_data.office_image
    preLoadedImages.current.push(aboutImg)

  }

  useEffect(() => {
    preLoadImages()
  }, [])


  const [ info, setInfo ] = useState((
    [
      <p key="description" className={ classes.companyDescription }>{ frontPageData.company_description } </p>,
      <div key="image" className={ classes.descriptionImageContainer }>
        <ImgHoverColor
          fadeContentIn={ fadePageIn }
          images={ frontPageData.front_page_images }
        />
        <div className={ classes.location }>
          { frontPageData.caption }
        </div>
      </div>
    ]
  ))

  const activeClassRef = useRef(null)
  const inDescriptionClassRef = useRef(null)

  const switchInfo = (data) => {

    const FADE_OUT_TIME = 200

    const curSelectedEl = document.querySelector(`span[name="${data.section_name}"]`)
    const prevActiveEl = document.querySelector(`.${activeClassRef.current}`)
    const filtersContainerEl = document.querySelector(`div[name=filters-container]`)


    if (data.section_name !== 'Home' && data.section_name !== 'About') {

      if (!prevActiveEl) {
        // add inDescription class
        if (!filtersContainerEl.classList.contains(inDescriptionClassRef.current))
          filtersContainerEl.classList.add(inDescriptionClassRef.current)

        curSelectedEl.classList.add(activeClassRef.current)

      } else {

        prevActiveEl.classList.remove(activeClassRef.current)
        curSelectedEl.classList.add(activeClassRef.current)

      }

      fadeDescriptionOut()
      setTimeout(() => {
        setInfo(
          // <div className={ [ classes.descriptionContainer, classes.fadeOut ].join(' ') }>

          [
            <p key="description" className={ classes.description } dangerouslySetInnerHTML={ { __html: toHTML(data.section_description) } } />,
            <div key="image" className={ classes.descriptionImageContainer }>
              <Carousel
                fadeDescriptionIn={ fadeDescriptionIn }
                images={ data.section_images }
              />
            </div>
          ]

        )
      }, FADE_OUT_TIME)

    } else if (data.section_name === 'Home') {

      // if clicking on home
      if (prevActiveEl)
        prevActiveEl.classList.remove(activeClassRef.current)

      if (filtersContainerEl.classList.contains(inDescriptionClassRef.current))
        filtersContainerEl.classList.remove(inDescriptionClassRef.current)


      fadeDescriptionOut()
      setTimeout(() => {
        setInfo(
          [
            <p key="description" className={ classes.companyDescription }>{ frontPageData.company_description } </p>,
            <div key="image" className={ classes.descriptionImageContainer }>
              <ImgHoverColor
                fadeContentIn={ fadeDescriptionIn }
                images={ frontPageData.front_page_images }
              />
              <div className={ classes.caption }>
                { frontPageData.caption }
              </div>
            </div>
          ]
        )
      }, FADE_OUT_TIME)

    } else if (data.section_name === 'About') {

      if (!filtersContainerEl.classList.contains(inDescriptionClassRef.current))
        filtersContainerEl.classList.add(inDescriptionClassRef.current)

      if (prevActiveEl)
        prevActiveEl.classList.remove(activeClassRef.current)

      fadeDescriptionOut()
      setTimeout(() => {
        setInfo(
          <About fadeDescriptionIn={ fadeDescriptionIn } />
        )
      }, FADE_OUT_TIME)

    }

    if (data.section_name !== 'About') {
      const navAboutEl = document.querySelector(`div[name=nav-about]`)
      if (navAboutEl.classList.length !== 0)
        navAboutEl.classList = ' ' // remove el
    }

    let taglineEl = document.querySelector(`.${classes.tagline}`)

    // this property is for logo click to home
    let logoIsHome = document.querySelector(`.${classes.logo}`).dataset.isHome

    if (data.section_name !== 'Home') {
      // 
      if (!taglineEl.classList.contains(classes.mute)) {
        taglineEl.classList.add(classes.mute)
        document.querySelector(`.${classes.heading}`).classList.add(classes.mute)
      }

      if (logoIsHome === 'true')
        document.querySelector(`.${classes.logo}`).dataset.isHome = 'false'

    } else {
      if (taglineEl.classList.contains(classes.mute)) {
        taglineEl.classList.remove(classes.mute)
        document.querySelector(`.${classes.heading}`).classList.remove(classes.mute)
      }

      if (logoIsHome === 'false')
        document.querySelector(`.${classes.logo}`).dataset.isHome = 'true'

    }

  }

  function fadePageIn () {
    document.querySelector(`.${classes.page}`).classList.add(classes.fadeIn)
    fadeDescriptionIn()
  }

  function fadeDescriptionIn () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.add(classes.fadeIn)
  }

  function fadeDescriptionOut () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.remove(classes.fadeIn)
  }

  useEffect(() => {

    if (window.screen.width >= 500 && !isMobile) {
      setTimeout(() => {
        fadePageIn()
      }, 1000)
    } else if (window.screen.width < 500 && !isMobile) {
      setIsMobile(true)

    } else if (window.screen.width >= 500 && isMobile) {
      setIsMobile(false)

    }

  }, [ isMobile ])

  let content = (
    <div className={ classes.page }>
      <Helmet>
        <title>IPT Creative</title>
      </Helmet>

      <Layout>

        <div className={ classes.wrapper }>

          <div className={ classes.frontPageContainer }>
            <span className={ classes.value }>
              <SVG
                className={ classes.logo }
                onClick={ () => {
                  if (document.querySelector(`.${classes.logo}`).dataset.isHome !== 'true') {
                    switchInfo({
                      section_name: 'Home'
                    })
                  }
                } }
                src={ logo_data.logo_image }
                data-is-home="true"
              />
              <span className={ classes.tagline }>
                <span className={ classes.orange }>I</span>nnovation.&nbsp;
                <span className={ classes.orange }>P</span>eople.&nbsp;
                <span className={ classes.orange }>T</span>enacity.&nbsp;
              </span>
            </span>
            <div className={ classes.heading }>
              { frontPageData.heading }
            </div>

          </div>

          <div className={ classes.contentContainer }>
            <div className={ [ classes.descriptionContainer, classes.fadeIn ].join(' ') } >
              { info }
            </div>

            <Filters
              switchInfo={ switchInfo }
              activeClassRef={ activeClassRef } // must pass this rather than below
              // activeClass={ activeClassRef.current }
              inDescriptionClassRef={ inDescriptionClassRef }
            />

          </div>

        </div>

        <Nav switchInfo={ switchInfo } activeClassRef={ activeClassRef } />
      </Layout >
    </div>
  )
  if (isMobile) {
    content = (
      <Mobile />
    )
  }


  return (
    <React.Fragment>
      { content }
    </React.Fragment>
  )
}

export default Home