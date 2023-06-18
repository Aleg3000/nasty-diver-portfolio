import { Transform } from 'ogl'
import { map } from 'lodash'
import Media from './Media.js'
import GSAP from 'gsap'

export default class Gallery {
  constructor({ element, geometry, gl, index, scene, sizes }) {
    this.element = element
    this.geometry = geometry
    this.gl = gl
    this.scene = scene
    this.sizes = sizes

    this.group = new Transform()

    this.scroll = {
      current: 0,
      target: 0,
      lerp: 0.1,
      start: 0
    }

    this.createMedias()

    this.speed = 0

    this.group.setParent(this.scene)
  }

  createMedias() {
    this.mediasElements = this.element.querySelectorAll('.project__gallery__media')

    this.medias = map(this.mediasElements, (element, index) => {
      return new Media({
        element,
        geometry: this.geometry,
        gl: this.gl,
        index,
        scene: this.scene,
        sizes: this.sizes
      })
    })
  }

  // Events

  onTouchDown({ x, y }) {
    this.scroll.start = this.scroll.current
  }

  onTouchMove({ x, y }) {
    const distance = x.start - x.end

    this.scroll.target = this.scroll.current - distance
  }

  onTouchUp({ x, y }) {

  }

  onWheel({ pixelY, spinY }) {
    // this.speed = speed
    map(this.medias, media => media.onWheel({ pixelY, spinY }))
  }


  onResize(event) {

    this.bounds = this.element.getBoundingClientRect()

    this.sizes = event.sizes

    this.width = this.bounds.width / window.innerWidth * this.sizes.width

    this.scroll.current = this.scroll.target = 0

    map(this.medias, media => media.onResize(event, this.scroll.current))
  }



  // UPDATE

  update() {
    if (!this.bounds) return


    // if (this.scroll.current < this.scroll.target) {
    //   this.direction = 'left'
    // } else if (this.scroll.current > this.scroll.target) {
    //   this.direction = 'right'
    // }

    // this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)

    map(this.medias, (media, i) => {
      // const x = media.mesh.position.x + media.mesh.scale.x / 2 * (this.direction === 'left' ? 1 : -1)

      // if (this.direction === 'left' && x < -this.sizes.width / 2) {
      //   media.extra += this.width
      // } else if (this.direction === 'right' && x > this.sizes.width / 2) {
      //   media.extra -= this.width
      // }

      media.update(this.scroll.current)
    })
  }

  // destroy

  destoy() {
    this.scene.removeChild(this.group)
  }
}
