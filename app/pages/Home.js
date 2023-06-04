import Page from "classes/Page.js";
// import Button from "../../classes/Button.js";

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        link: '.home__link',
        wrapper: '.home__wrapper'
      }
    })
  }

  create() {
    super.create()
    // this.link = new Button( {
    //   element: this.elements.link
    // })
  }

  destroy() {
    super.destroy()
    // this.link.removeEventListeners()
  }
}
