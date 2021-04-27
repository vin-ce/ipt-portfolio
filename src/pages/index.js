import React, { useState } from "react"
import "../styles/styles.styl"
import classes from "../styles/index.module.styl"
import { toHTML } from "../utils/utils"

import Layout from "../components/Layout"
import Filters from '../components/Filters'
import Nav from "../components/Nav"

import frontPageData from "../../content/sections/front_page.json"
import categoriesData from "../../content/sections/categories.json"



import { Controller, Scene } from 'react-scrollmagic';


const Home = () => {

  const [ modal, setModal ] = useState(null)

  const createModal = (modalEl) => {
    console.log("MODAL")

    if (modalEl) {
      setModal(modalEl)
      const bodyEl = document.querySelector('body')
      // cancels the scroll
      bodyEl.style.overflow = "hidden"
    }
    else {
      setModal(null)
      document.querySelector('body').style.overflow = "auto"
    }
  }

  return (
    <>
      <Layout>

        <div className={ classes.wrapper }>

          {/* <div id="triggerEl" className={ classes.triggerEl } /> */ }



          <div className={ classes.contentContainer }>
            <Filters createModal={ createModal } />
            {/* <div className={ classes.content }> */ }
            {/* </div> */ }

          </div>

          <div className={ classes.frontPageContainer }>
            <h1>
              <span className={ classes.value }>{ frontPageData.value }</span>
              <br />
              <div className={ classes.heading }>
                { frontPageData.heading }
              </div>
            </h1>

            <p className={ classes.companyDescription }>{ frontPageData.company_description } </p>
          </div>



        </div>

      </Layout >
      { modal }
      <Nav createModal={ createModal } />
    </>
  )
}

export default Home