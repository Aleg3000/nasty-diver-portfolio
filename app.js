import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'

import path from 'path'
import express from 'express'
import errorHandler from 'errorhandler'
import logger from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import UAParser from 'ua-parser-js'

import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, './.env') })

const app = express()
const port = 3000

const handleLinkResolver = doc => {
  if (doc.type === 'project') {
    return `/project/${doc.slug}`
  }

  return '/'
}
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.locals.basedir = app.get('views')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(errorHandler())

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = handleLinkResolver

  res.locals.Numbers = index => index === 0 ? 'One' : index === 1 ? 'Two' : index === 2 ? 'Three' : index === 3 ? 'Four' : ''

  res.locals.ctx = {
    prismicH
  }
  next()
})

const handleRequest = async () => {
  const meta = await client.getSingle('meta')
  // const preloader = await client.getSingle('preloader')
  const footer = await client.getSingle('footer')

  return {
    meta,
    // preloader,
    footer
  }
}

app.get('/', async (req, res) => {
  const defaults = await handleRequest()
  const home = await client.getSingle('homepage')
  // console.dir(home.data, {depth: 10})
  // console.log(defaults.footer.data.body[0].items)
  res.render('pages/home', {
    ...defaults,
    home,
  })
})

app.get('/project/:uid', async (req, res) => {
  const defaults = await handleRequest()
  const project = await client.getByUID('project', req.params.uid)
  // console.log(project.data.body[0].items[0].image['media-mobile'])
  res.render('pages/project', {
    ...defaults,
    project
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
