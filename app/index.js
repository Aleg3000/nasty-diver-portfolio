import Preloader from "./components/Preloader.js"

class App {
  constructor() {
    this.createContent()

    this.createPreloader()

  }

  createContent() {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPreloader() {
    this.preloader = new Preloader()
  }

}

new App()
