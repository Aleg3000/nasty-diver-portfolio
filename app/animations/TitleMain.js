import GSAP from 'gsap'

export default class TitleMain {
  constructor({ element, elements }) {
    this.element = element

    this.rightTitle = element.querySelector('.home__main__subtitle__label') || element.querySelector('.project__main__subtitle__label')
    this.leftTitle = element.querySelector('.home__main__subtitle__first') || element.querySelector('.project__main__subtitle__first')
    this.rightTitleMobile = element.querySelector('.home__main__subtitle__label-mobile') || element.querySelector('.project__main__subtitle__label-mobile')
    this.centerTitle = element.querySelector('.home__main__subtitle__second') || element.querySelector('.project__main__subtitle__second')
  }

  animateIn() {
    if (!this.rightTitleMobile && window.innerWidth < 640) return
    this.leftW = this.leftTitle.getBoundingClientRect().width
    this.centerW = this.centerTitle.getBoundingClientRect().width
    this.rightW = this.rightTitle.getBoundingClientRect().width ||this.rightTitleMobile.getBoundingClientRect().width
    this.wrapperW = this.element.getBoundingClientRect().width

    this.gap = (this.wrapperW - this.centerW - this.leftW - this.rightW) / 1
    this.centerDistance = this.rightW + this.gap
    this.rightDistance = this.centerW - this.gap / 2

    this.timeline = GSAP.timeline({
      delay: 0.5
    })
    this.timeline.set(this.rightTitle, {
      x: -this.rightDistance,
    })
    if (this.rightTitleMobile) {
      this.timeline.set(this.rightTitleMobile, {
        x: -this.rightDistance,
      })
    }
    this.timeline.to(this.centerTitle, {
      x: this.centerDistance,
      duration: 0.7
    })
    this.timeline.to(this.rightTitle, {
      autoAlpha: 1,
      duration: 0.7
    })
    if (this.rightTitleMobile) {
      this.timeline.to(this.rightTitleMobile, {
        autoAlpha: 1
      })
    }

    this.timeline.set(this.element, {
      justifyContent: 'space-between'
    })
    this.timeline.set(this.rightTitle, {
      x: 0
    })
    if (this.rightTitleMobile) {
      this.timeline.set(this.rightTitleMobile, {
        x: 0
      })
    }
    this.timeline.set(this.centerTitle, {
      x: 0,
      order: 5
    })
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize() {

  }
}
