const { createReadStream } = require('fs')
const {format} = require('util')
const gc = require('../config/mediaConfig')
const bucket = gc.bucket('pennpack')
const Multer = require('multer');

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const generateNewName = (originalName, userId) => {
	// Do this to avoid overwriting files with same name

	const components = originalName.split('.')
	const filenameNoExtension = components[0]
	let dateStr = (new Date()).toLocaleString().replace(/\//g, '_').replace(/, /g, '_').replace(/:/g, '_')
	let newFileName = `${userId}_${filenameNoExtension}_${dateStr}`
	for (let i = 1; i < components.length; i++) {
		newFileName += '.' + components[i]	
	}
	return newFileName
}

 const uploadImage = (file, newFileName) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file

	let blob = null
	if (newFileName) {
		blob = bucket.file(newFileName.replace(/ /g, "_"))
	} else {
		blob = bucket.file(originalname.replace(/ /g, "_"))
  }
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})



module.exports={
	generateNewName,
	uploadImage
};