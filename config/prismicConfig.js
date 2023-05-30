// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from 'node-fetch'
import * as prismic from '@prismicio/client'
import dotenv from 'dotenv'

dotenv.config()

const repoName = 'nastya-diver' // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN // If your repository is private, add an access token.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: 'homepage',
    path: '/:uid'
  }
]

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes
})
