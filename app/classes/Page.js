import each from 'lodash/each.js'
import map from 'lodash/map.js'
import GSAP from 'gsap'

import AsyncLoad from './AsyncLoad.js'

import Prefix from 'prefix'
import Title from '../animations/TitleMain.js'
import Paragraph from '../animations/Paragraph.js'
import Label from '../animations/Label.js'
import Highlight from '../animations/Highlight.js'

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
          this.elements[key] = [document.querySelector(entry)]
        }
      }
    })

    this.createAnimations()
    this.createPreloader()
  }

  createPreloader() {
    this.preloaders = map(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
  }

  createAnimations() {
    this.animations = []

    // this.animationsHighlights = map(this.elements.animationsHighlights, element => {
    //   return new Highlight({ element })
    // })

    // this.animations.push(...this.animationsHighlights)
    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({ element })
    })

    this.animations.push(...this.animationsTitles)


    this.animationsParagraphs = map(this.elements.animationsParagraphs, element => {
      return new Paragraph({ element })
    })

    this.animations.push(...this.animationsParagraphs)


    // this.animationsLabels = map(this.elements.animationsLabels, element => {
    //   return new Label({ element })
    // })

    // this.animations.push(...this.animationsLabels)
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
        each(this.animationsTitles, title => title.animateIn())
        each(this.animationsParagraphs, p => p.animateIn())
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
    // if (this.elements.wrapper) {
    //   this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    // }

    each(this.animations, animation => {
      animation.onResize && animation.onResize()
      // animation.onResize()
    })
  }

  addEventListeners() {

  }

  removeEventListeners() {

  }

  update() {

  }
}
