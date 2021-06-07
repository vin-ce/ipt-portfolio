import React, { useState } from "react"
import "../styles/styles.styl"
import classes from "../styles/index.module.styl"
import { toHTML } from "../utils/utils"
import SVG from "react-inlinesvg"

import Layout from "../components/Layout"
import Filters from '../components/Filters'
import Nav from "../components/Nav"

import frontPageData from "../../content/sections/front_page.json"
import categoriesData from "../../content/sections/categories.json"
import logo_data from "../../content/sections/logo.json"



import { Controller, Scene } from 'react-scrollmagic';


const Home = () => {

  // const [ modal, setModal ] = useState(null)
  const [ info, setInfo ] = useState((
    <span className={classes.descriptionContainer}> 
      <p className={ classes.companyDescription }>{ frontPageData.company_description } </p>
      <img className={classes.descriptionImage} onLoad={ fadePageIn } src={ frontPageData.image } />
    </span>
  ))


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

  const switchInfo = (data) => {
    console.log(data)
    
    // add fade out, then setInfo on timeInterval
    // select the filter that is active, remove it. Add active to correct filter via 
    // document.querySelector(`span[name="${activeFilter}"]`)

    // if filter Home is selected, set span[name=home] opacity 0

    // if first switch, deactivate all filters (add class to filter container)

    setInfo(
      <div className={classes.descriptionContainer}> 
        <span>
          {/* <h1 className={classes.descriptionTitle}>{ data.section_name }</h1> */}
          <p className={ classes.description } dangerouslySetInnerHTML={ { __html: toHTML(data.section_description) } }/>
        </span>
        <img className={classes.descriptionImage} onLoad={ fadeDescriptionIn } src={ data.section_image } />
      </div>
    )
  }

  function fadePageIn() {
    document.querySelector(`.${classes.page}`).classList.add(classes.fadeIn)
  }

  function fadeDescriptionIn () {
    document.querySelector(`.${classes.descriptionContainer}`).classList.add(classes.fadeIn)
  }

    // e.target.classList.add(classes.fadeIn)

  // things load in on the same step

  return (
    <div className={classes.page}>
      <Layout>

        <div className={ classes.wrapper }>

          <div className={ classes.frontPageContainer }>
            <span className={ classes.value }>
              <SVG className={ classes.logo } src={ logo_data.logo_image } />
              {/* { frontPageData.value } */}
              {/* <span className={classes.orange}>Innovation</span>.&nbsp;
              <span className={classes.orange}>Process</span>.&nbsp;
              <span className={classes.orange}>Tenacity</span>.&nbsp; */}
              <span className={classes.orange}>I</span>nnovaction.&nbsp;
              <span className={classes.orange}>P</span>rocess.&nbsp;
              <span className={classes.orange}>T</span>enacity.&nbsp;
            </span>
            <div className={ classes.heading }>
              { frontPageData.heading }
            </div>
            {/* <div className={ classes.frontPageContainer }>
              <h1>
                <span className={ classes.value }>{ frontPageData.value }</span>
                <br />
                <div className={ classes.heading }>
                  { frontPageData.heading }
                </div>
              </h1>

            </div> */}

          </div>


          <div className={classes.contentContainer}> 
          

            {/* <span className={classes.descriptionContainer}> 
              
              <p className={ classes.description }>{ frontPageData.company_description } </p>
              <img className={classes.descriptionImage} onLoad={ fadeIn } src={ frontPageData.image } />
            </span> */}
            { info }
            <Filters switchInfo={ switchInfo } />
            {/* <div id="triggerEl" className={ classes.triggerEl } /> */ }

            
          </div>

        </div>

        <Nav switchInfo={ switchInfo } />
      </Layout >
      {/* { modal } */}
    </div>
  )
}

export default Home