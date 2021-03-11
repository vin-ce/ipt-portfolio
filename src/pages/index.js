import React from "react"
import "../styles/styles.styl"
import classes from "../styles/index.module.styl"

import Layout from "../components/Layout"
import data from "../../content/sections/front_page.json"
import Filters from '../components/Filters'
import ScrollDown from "../components/ScrollDown"



const Home = () => {

  console.log(data)

  return (
    <Layout>
      <div className={ classes.wrapper }>

        <div className={ classes.frontPageContainer }>
          <h1>
            <span className={ classes.value }>{ data.value }</span>
            <br />
            { data.heading }
          </h1>
          <p className={ classes.companyDescription }>{ data.company_description }</p>
        </div>

        <img src={ data.image } alt={ 'front page building' } className={ classes.frontImage } />

        <ScrollDown scrollToId='categories' />

      </div>
      <div id="categories" className={ classes.categoriesContainer }>
        <Filters context="home" />
      </div>
    </Layout>
  )
}

export default Home