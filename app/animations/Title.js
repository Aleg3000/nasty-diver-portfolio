import Animation from "../classes/Animation.js";
import GSAP from 'gsap'
import { calculate, split } from "../utils/text.js";
import { each } from "lodash";

export default class Title extends Animation {
  constructor({ element, elements }) {
    super( {
      element,
      elements,
    })

    split({ element: this.element, append: true })
    split({ element: this.element, append: true })

    this.elementLinesSpans = this.element.querySelectorAll('span')
  }

  animateIn() {
    this.timeline = GSAP.timeline({
      delay: 0.5
    })
    this.timeline.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementLines, (line, index) => {
        this.timeline.fromTo(line, {
          autoAlpha: 1,
          y: '80%'
        }, {
          autoAlpha: 1,
          delay: index * 0.1,
          duration: 1.5,
          ease: 'expo.out',
          y: '0%'
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
