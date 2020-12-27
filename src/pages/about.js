import React from "react"
import Layout from "../components/Layout"
// import remark from "remark"
// import remarkHTML from 'remark-html'
import { toHTML } from "../utils/utils"
import data from "../../content/sections/about.json"
import classes from "../styles/about.module.styl"

const About = props => {

  let images = []
  data.certifications_images.forEach((object, index) => {
    const imageSrc = object.image
    const url = object.url

    images.push(
      <a
        key={ `image_${index}` }
        href={ url }
        target="_blank" rel="noreferrer noopener"
      >
        <img src={ imageSrc } />
      </a>
    )
  })

  return (
    <Layout>
      <h1>About</h1>
      <div dangerouslySetInnerHTML={ { __html: toHTML(data.description) } } />
      <div className={ classes.certificationContainer }>{ images }</div>
    </Layout>
  )
}

export default About

