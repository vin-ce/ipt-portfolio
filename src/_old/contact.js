import React from "react"
import Layout from "../components/Layout"
import classes from "../styles/contact.module.styl"
import data from "../../content/sections/contact.json"

const Contact = props => {

  let icons = []
  data.external_contact_methods.forEach((object, index) => {
    const iconSrc = object.icon
    const url = object.url

    icons.push(
      <a
        key={ `image_${index}` }
        href={ url }
        target="_blank" rel="noreferrer noopener"
      >
        <img src={ iconSrc } />
      </a>
    )
  })

  return (
    <Layout>
      <h1>Contact</h1>
      <p>Get in touch by emailing us at:{ ' ' }
        <a className={ classes.email } href="mailto:sean.wang@iptcreative.co.nz">sean.wang@iptcreative.co.nz</a>.
      </p>
      <div className={ classes.externalContactContainer }>{ icons }</div>
    </Layout>
  )
}

export default Contact

