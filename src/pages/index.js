import React, { useState, useRef, useEffect } from "react"
import "../styles/styles.styl"
import classes from "../styles/index.module.styl"
import { toHTML } from "../utils/utils"
import SVG from "react-inlinesvg"

import Layout from "../components/Layout"
import Filters from '../components/Filters'
import Nav from "../components/Nav"
import About from "../components/About"

import frontPageData from "../../content/sections/front_page.json"
import categoriesData from "../../content/sections/categories.json"
import logo_data from "../../content/sections/logo.json"

const Home = () => {

  const [ info, setInfo ] = useState((
    [
      <p key="description" className={ classes.companyDescription }>{ frontPageData.company_description } </p>,
      <div key="image" className={ classes.descriptionImageContainer }>
        <img className={ classes.descriptionImage } onLoad={ fadePageIn } src={ frontPageData.image } />
        <div className={ classes.location }>Based in Christchurch, New Zealand</div>
      </div>
    ]
  ))


  // const [ modal, setModal ] = useState(null)
  // const createModal = (modalEl) => {
  // console.log("MODAL")

  // if (modalEl) {
  //   setModal(modalEl)
  //   const bodyEl = document.querySelector('body')
  //   // cancels the scroll
  //   bodyEl.style.overflow = "hidden"
  // }
  // else {
  //   setModal(null)
  //   document.querySelector('body').style.overflow = "auto"
  // }
  // }

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
              <img className={ classes.descriptionImage } onLoad={ fadeDescriptionIn } src={ data.section_image } />
              {/* <div className={ classes.location }>Based in Christchurch, New Zealand</div> */ }
            </div>
          ]

        )
      }, FADE_OUT_TIME)

    } else if (data.section_name == 'Home') {

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
              <img className={ classes.descriptionImage } onLoad={ fadeDescriptionIn } src={ frontPageData.image } />
              <div className={ classes.location }>Based in Christchurch, New Zealand</div>
            </div>
          ]
        )
      }, FADE_OUT_TIME)

    } else if (data.section_name == 'About') {

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
      if (navAboutEl.classList.length != 0)
        navAboutEl.classList = ' ' // remove el
    }

    if (data.section_name !== 'Home') {
      // 
      let taglineEl = document.querySelector(`.${classes.tagline}`)
      if (!taglineEl.classList.contains(classes.mute)) {
        taglineEl.classList.add(classes.mute)
        document.querySelector(`.${classes.heading}`).classList.add(classes.mute)
      }

    } else {
      let taglineEl = document.querySelector(`.${classes.tagline}`)
      if (taglineEl.classList.contains(classes.mute)) {
        taglineEl.classList.remove(classes.mute)
        document.querySelector(`.${classes.heading}`).classList.remove(classes.mute)
      }
    }

  }

  function fadePageIn () {
    console.log("PAGE FADE IN")
    document.querySelector(`.${classes.page}`).classList.add(classes.fadeIn)
    // document.querySelector(`.${classes.descriptionContainer}`).classList.add(classes.fadeIn)
  }

  function fadeDescriptionIn () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.remove(classes.fadeOut)
    document.querySelector(`.${classes.descriptionContainer}`).classList.add(classes.fadeIn)
  }

  function fadeDescriptionOut () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.remove(classes.fadeIn)
    document.querySelector(`.${classes.descriptionContainer}`).classList.add(classes.fadeOut)
  }

  useEffect(() => {
    setTimeout(() => {
      fadePageIn()
    }, 1000)
  }, [])

  // e.target.classList.add(classes.fadeIn)

  // things load in on the same step

  return (
    <div className={ classes.page }>
      <Layout>

        <div className={ classes.wrapper }>

          <div className={ classes.frontPageContainer }>
            <span className={ classes.value }>
              <SVG className={ classes.logo } src={ logo_data.logo_image } />
              <span className={ classes.tagline }>
                <span className={ classes.orange }>I</span>nnovation.&nbsp;
                <span className={ classes.orange }>P</span>rocess.&nbsp;
                <span className={ classes.orange }>T</span>enacity.&nbsp;
              </span>
            </span>
            <div className={ classes.heading }>
              { frontPageData.heading }
            </div>

          </div>

          {/* <img key="image" className={ classes.descriptionImage } onLoad={ fadePageInTest } src={ frontPageData.image } /> */ }

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
      {/* { modal } */ }
    </div>
  )
}

export default Home