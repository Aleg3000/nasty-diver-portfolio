import GSAP from 'gsap'
import Prefix from 'prefix'

export default class Scroll {
  constructor({ wrapper }) {
    this.state = {
      ease: 0.07,
      position: 0,
      current: 0,
      target: 0,
      limit: 0
    }
    this.wrapper = wrapper
    this.transformPrefix = Prefix('transform')
  }

  setLimit(limit) {
    this.state.limit = limit
  }

  onTouchDown (event) {
    this.isDown = true

    this.state.position = this.state.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove (event) {
    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = (this.start - y) * 3

    this.state.target = this.state.position + distance
  }

  onTouchUp (event) {
    this.isDown = false
  }

  onWheel({ pixelY }) {
    this.state.target += pixelY
  }

  transform (element, y) {
    element.style[this.transformPrefix] = `translate3d(0, ${-Math.round(y)}px, 0)`
  }

  update() {
    this.state.target = GSAP.utils.clamp(0, this.state.limit, this.state.target)

    this.state.current = GSAP.utils.interpolate(this.state.current, this.state.target, this.state.ease)
    this.state.current = Math.floor(this.state.current)

    if (this.state.current < 0.1) {
      this.state.current = 0
    }

    if (this.wrapper) {
      this.transform(this.wrapper, this.state.current)
    }

    this.state.last = this.state.current
  }
}
