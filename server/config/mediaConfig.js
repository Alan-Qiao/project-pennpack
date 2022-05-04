const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './keys.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: path.join(__dirname, 'gc-key.json'),
  projectId: 'pennpack',
})

module.exports = storage
