import React from "react"
import "../styles/styles.styl"
import classes from "../styles/index.module.styl"
import { toHTML } from "../utils/utils"

import Layout from "../components/Layout"
import front_page_data from "../../content/sections/front_page.json"
import about_data from "../../content/sections/about.json"


import Filters from '../components/Filters'
import ScrollDown from "../_old/ScrollDown"

import { Controller, Scene } from 'react-scrollmagic';


const Home = () => {

  const frontPageTriggerElStyles = {
    position: 'absolute',
    top: '5vh'
  }


  return (
    <Layout>

      <div className={ classes.wrapper }>

        <div id="frontPageTriggerEl" style={ frontPageTriggerElStyles } />

        <Controller>
          <Scene
            classToggle={ classes.mute }
            triggerHook="onLeave"
            triggerElement="#frontPageTriggerEl"
          >
            <div className={ classes.frontPageContainer }>
              <h1>
                <span className={ classes.value }>{ front_page_data.value }</span>
                <br />
                <span className={ classes.heading }>
                  { front_page_data.heading }
                </span>
              </h1>
            </div>
          </Scene>
        </Controller>

        <div className={ classes.contentContainer }>

          <Controller>
            <Scene
              classToggle={ classes.mute }
              triggerHook="onLeave"
              triggerElement="#frontPageTriggerEl"
            >
              <p className={ classes.companyDescription }>{ front_page_data.company_description }
              </p>
            </Scene>
          </Controller>

          <div className={ classes.content }>

            <Controller>
              <Scene
                classToggle={ classes.mute }
                // triggerHook="onLeave"
                triggerElement="#aboutTriggerEl"
              >
                <div className={ classes.about } dangerouslySetInnerHTML={ { __html: toHTML(about_data.description) } } />
              </Scene>
            </Controller>

            <div id="aboutTriggerEl" />

            <Filters />
          </div>


        </div>



      </div>
    </Layout >
  )
}

export default Home