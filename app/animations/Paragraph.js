import Animation from "../classes/Animation.js";
import GSAP from 'gsap'
import { calculate, split } from "../utils/text.js";
import { each } from "lodash";

export default class Paragraph {
  constructor({ element, elements }) {
    this.element = element

    this.elementLinesSpans = split({
      element: this.element,
      append: true
    })
  }

  animateIn() {
    this.timeline = GSAP.timeline({
      delay: 0.7
    })
    this.timeline.set(this.element, {
      autoAlpha: 1
    })
    each(this.elementLines, (line, index) => {
        this.timeline.fromTo(line, {
          autoAlpha: 0,
          x: '100%'
        }, {
          autoAlpha: 1,
          delay: index * 0.1,
          duration: 1.5,
          ease: 'expo.out',
          x: '0%'
        }, 0)

    })

  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize() {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
