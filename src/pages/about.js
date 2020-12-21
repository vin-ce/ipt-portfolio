import React from "react"
import Layout from "../components/Layout"
// import remark from "remark"
// import remarkHTML from 'remark-html'
import { toHTML } from "../utils/utils"
import data from "../../content/sections/about.json"

const About = props => {

  console.log('DATA: ', data)
  console.log('to html: ', toHTML(data.description))

  let images = []
  data.certifications_images.forEach((object, index) => {
    const imageUrl = object.image

    images.push(
      <img
        key={ `image_${index}` }
        src={ `./${imageUrl}` }
      />
    )
  })

  return (
    <Layout>
      <div>About</div>
      <div dangerouslySetInnerHTML={ { __html: toHTML(data.description) } }></div>
      <div>{ images }</div>
    </Layout>
  )
}

export default About

