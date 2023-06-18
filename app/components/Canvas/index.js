import { Camera, Renderer, Transform } from 'ogl'
import Project from './Project/index.js'
// import Home from './Home/index.js'
// import About from './About/index.js'


export default class Canvas {
  constructor({ template }) {
    this.template = template

    this.x = {
      start: 0,
      distance: 0,
      end: 0
    }

    this.y = {
      start: 0,
      distance: 0,
      end: 0
    }
    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.onResize()

    console.log('canvas created')

    // this.onRouteUpdate(this.template)
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: 2
    })

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)

    this.camera.position.z = 5
  }

  createHome() {
    // this.home = new Home({
    //   gl: this.gl,
    //   scene: this.scene,
    //   sizes: this.sizes
    // })
  }

  destroyHome() {
    if (!this.home) return
    this.home.destroy()
    this.home = null
  }

  createProject() {
    this.project = new Project({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
    console.log('project created')
  }

  destroyProject() {
    if (!this.project) return
    this.project.destroy()
    this.project = null
  }

  createScene() {
    this.scene = new Transform()
  }

  // EVENTS

  onTouchDown(event) {
    this.isDown = true
    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.about) {
      this.about.onTouchDown(values)
    }

    if (this.home) {
      this.home.onTouchDown(values)
    }
  }

  onTouchMove(event) {
    if (!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.project) {
      this.project.onTouchMove(values)
    }

    if (this.home) {
      this.home.onTouchMove(values)
    }
  }

  onTouchUp(event) {
    this.isDown = false
    const x = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
    const y = event.changedTouches ? event.changedTouches[0].clientY : event.clientY

    this.x.end = x
    this.y.end = y

    const values = {
      x: this.x,
      y: this.y
    }

    if (this.project) {
      this.project.onTouchUp(values)
    }

    if (this.home) {
      this.home.onTouchUp(values)
    }
  }

  onWheel(event) {
    if (this.home) {
      this.home.onWheel(event)
    }

    if (this.project) {
      this.project.onWheel(event)
    }
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.sizes = {
      height,
      width
    }

    const values = {
      sizes: this.sizes
    }

    if (this.project) {
      this.project.onResize(values)
    }
  }

  // onChange(template, isPreloaded) {
  //   if (template === 'project') {
  //     this.project.show(isPreloaded)
  //   } else {
  //     this.project.hide()
  //   }
  // }

  createProject() {
    this.project = new Project({
      gl: this.gl,
      scene: this.scene,
      sizes: this.sizes
    })
  }

  destroyProject() {
    if (!this.project) return
    this.project.destroy()
    this.project = null
  }

  onChange(template, isPreloaded) {
    if (this.project) {
      this.project.hide()
      this.destroyProject()
    }
    if (template === 'project') {
      console.log('creating project canvss')
      this.createProject()
      this.project.show(isPreloaded)
    }
  }

  onPreloaded () {
    // this.createProject()
    // this.createCollections()
    // this.createHome()

    // this.onChange(this.template, true)
    this.onChange(this.template, true)
  }

  // LOOP

  update() {
    if (this.project) {
      this.project.update()
    }
    if (this.home) {
      this.home.update()
    }
    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    })
  }
}
