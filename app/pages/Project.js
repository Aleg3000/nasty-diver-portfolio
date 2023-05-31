import Page from "classes/Page.js";
// import Button from "../../classes/Button.js";

export default class Project extends Page {
  constructor() {
    super({
      id: 'project',
      element: '.project',
      elements: {
        link: '.project__link'
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
