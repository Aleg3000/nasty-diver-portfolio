import each from 'lodash/each.js'
import map from 'lodash/map.js'
import GSAP from 'gsap'

import AsyncLoad from './AsyncLoad.js'

import Prefix from 'prefix'
// import Title from '../animations/Title.js'
// import Paragraph from '../animations/Paragraph.js'
// import Label from '../animations/Label.js'
// import Highlight from '../animations/Highlight.js'
// import { ColorsManager } from './Colors.js'
// import AsyncLoad from './AsyncLoad.js'

export default class Page {
  constructor({
    element,
    elements,
    id
   }) {
     this.selector = element
     this.selectorChildren = {
       ...elements,
       animationsHighlights: '[data-animation="highlight"]',
       animationsLabels: '[data-animation="label"]',
       animationsParagraphs: '[data-animation="paragraph"]',
       animationsTitles: '[data-animation="title"]',

       preloaders: '[data-src]'
      }
     this.id = id
     this.transformPrefix = Prefix('transform')
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)
        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })

    this.createPreloader()
  }

  createPreloader() {
    this.preloaders = map(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
    console.log(this.preloaders)
  }

  createAnimations() {

  }

  show() {
    return new Promise(resolve => {
      this.animationIn = GSAP.timeline()
      this.animationIn.fromTo(this.element, {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
      })

      this.animationIn.call(_ => {
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide() {
    return new Promise(resolve => {
      this.destroy()

      this.animationOut = GSAP.timeline()
      this.animationOut.to(this.element, {
        autoAlpha: 0,
      })

      this.animationOut.call(_ => {
        resolve()
      })
    })
  }

  destroy() {
    this.removeEventListeners()
  }

  onWheel() {

  }

  onResize() {

  }

  addEventListeners() {

  }

  removeEventListeners() {

  }

  update() {

  }
}
