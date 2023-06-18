import Preloader from "./components/Preloader.js"
import Home from "./pages/Home.js"
import Project from "./pages/Project.js"
import Canvas from "./components/Canvas/index.js"

import each from 'lodash/each.js'
import normalizeWheel from 'normalize-wheel'

class App {
  constructor() {
    this.createContent()

    this.createPreloader()

    this.createCanvas()

    this.createPages()

    this.addLinkListeners()

    this.addEventListeners()

    this.update()
  }

  createCanvas() {
    this.canvas = new Canvas({
      template: this.template
    })
  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPreloader() {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  onPreloaded() {
    this.preloader.destroy()

    this.onResize()

    this.canvas.onPreloaded()

    this.page.show()
  }

  createPages() {
    this.pages = {
      project: new Project(),
      home: new Home(),
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  async onChange({ url, push = true}) {
    await this.page.hide()
    console.log(url)
    const response = await fetch(url)

    if (response.status === 200) {
      const html = await response.text()
      const div = document.createElement('div')

      if (push) {
        window.history.pushState({}, '', url)
      }

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template = divContent.getAttribute('data-template')

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.canvas.onChange(this.template)

      this.page = this.pages[this.template]

      this.page.create()

      this.onResize()

      this.page.show()

      this.addLinkListeners()

    }
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  onTouchDown (event) {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(event)
    }

    if (this.page && this.page.onTouchDown) {
      this.page.onTouchDown(event)
    }
  }

  onTouchMove (event) {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(event)
    }

    if (this.page && this.page.onTouchDown) {
      this.page.onTouchMove(event)
    }
  }

  onTouchUp (event) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(event)
    }

    if (this.page && this.page.onTouchDown) {
      this.page.onTouchUp(event)
    }
  }

  onWheel(event) {
    const normalizedWheel = normalizeWheel(event)

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel)
    }

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel)
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a')

    each(links, link => {
      if (link.getAttribute('data-type') === 'out') return

      link.onclick = e => {
        const { href } = link

        e.preventDefault()

        this.onChange({ url: href })
      }
    })
  }

  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this))

    window.addEventListener('wheel', this.onWheel.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))

    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }

    requestAnimationFrame(_ => {
      if (this.canvas && this.canvas.onResize) {
        this.canvas.onResize()
      }
    })
  }

  update() {
    if (this.page && this.page.update) {
      this.page.update()
    }

    if (this.canvas && this.canvas.update) {
      console.log(this.canvas)
      this.canvas.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }
}

new App()
