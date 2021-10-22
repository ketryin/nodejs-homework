const jimp = require('jimp')
const path = require('path')
const usersCollection = require('./usersCollection')

const getResizedImageName = (userId, fileOriginalName) => {
  const fileExtension = path.extname(fileOriginalName)
  return `${userId}${fileExtension}`
}

const getResizedImagePath = imageName => {
  const root = path.resolve('./')
  return `${root}${path.sep}public${path.sep}avatars${path.sep}${imageName}`
}

async function updateAvatar(userId, file) {
  const resizedImageName = getResizedImageName(userId, file.originalname)
  const resizedImagePath = getResizedImagePath(resizedImageName)

  const image = await jimp.read(file.path)
  image.resize(250, 250)
  await image.writeAsync(resizedImagePath)

  const avatarUrl = `/avatars/${resizedImageName}`

  await usersCollection.findByIdAndUpdate(userId, { avatarUrl })

  return avatarUrl
}

module.exports = updateAvatar
