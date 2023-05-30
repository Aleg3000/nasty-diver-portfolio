import path from 'path'
import { fileURLToPath } from 'url'

import { merge } from 'webpack-merge'
import config from './webpack.config.js'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export default merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'public')
  }
})
