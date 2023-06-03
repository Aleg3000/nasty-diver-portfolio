import Preloader from "./components/Preloader.js"
import Home from "./pages/Home.js"
import Project from "./pages/Project.js"

import each from 'lodash/each.js'

class App {
  constructor() {
    this.createContent()

    this.createPreloader()

    this.createPages()

    this.addLinkListeners()

    this.addEventListeners()
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

    window.addEventListener('resize', this.onResize.bind(this))
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }
}

new App()
