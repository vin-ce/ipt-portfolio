import React, { useState } from "react"
import Layout from "../components/Layout"
import classes from "../styles/projects.module.styl"
import data from "../../content/sections/categories.json"

const Contact = props => {

  const [selectedCategories, setSelectedCategories] = useState([])

  console.log('data', data.categories_list)
  let categories = [];

  data.categories_list.forEach((category, categoryIndex) => {

    let sections = [];
    let sectionItems = [];

    // turn each name into id? eg:
    // hill-residential-house
    // probably not necessary - can directly match strings from categories -> project 'tags'

    if (category.category_items) {
      category.category_items.forEach((section, sectionIndex) => {

        if (section.section_items) {
          section.section_items.forEach((sectionItem, sectionItemIndex) => {

            const sectionItemEl = (
              <div className={ classes.sectionItem } key={ `c-${categoryIndex}_s-${sectionIndex}_sI-${sectionItemIndex}` }>
                <span>
                  { sectionItem.section_item_name }
                </span>
              </div>
            )

            sectionItems.push(sectionItemEl)
          })
        }

        const sectionClasses = [classes.section]
        if (sectionItems.length === 0) sectionClasses.push(classes.noChildren)

        const sectionEl = (
          <div className={ sectionClasses.join(' ') } key={ `c-${categoryIndex}_s-${sectionIndex}` }>
            <span>
              { section.section_name }
            </span>
            { sectionItems }
          </div>
        )

        sections.push(sectionEl)
        // reset for each loop
        sectionItems = [];

      })
    }

    const categoryEl = (
      <div className={ classes.category } key={ `c-${categoryIndex}` }>
        <span>
          { category.category_name }
        </span>
        <div className={ classes.sectionContainer }>
          { sections }
        </div>
      </div>
    )

    categories.push(categoryEl)

  })

  return (
    <Layout>
      <h1>Projects</h1>
      <div className={ classes.categoriesContainer }>
        { categories }
      </div>
    </Layout>
  )
}

export default Contact

