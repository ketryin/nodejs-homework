const express = require('express')
const router = express.Router()
const validationMiddleware = require('../../middlewares/validationMiddleware')
const { addOrUpdateSchema, updateFavoriteSchema } = require('../../validations/validationSchemas')

const listContacts = require('../../model/listContacts')
const getContactById = require('../../model/getContactById')
const addContact = require('../../model/addContact')
const removeContact = require('../../model/removeContact')
const updateContact = require('../../model/updateContact')

const notFoundMessage = { message: 'Not found' }

router.get('/', async (req, res, next) => {
  const contactsList = await listContacts()
  res.json(contactsList)
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)

  if (contact) {
    res.json(contact)
    return
  }

  res.status(404).json(notFoundMessage)
})

router.post('/', validationMiddleware(addOrUpdateSchema), async (req, res, next) => {
  const newContact = await addContact(req.body)
  res.status(201).json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const isSuccess = await removeContact(req.params.contactId)

  if (isSuccess) {
    res.json({ message: 'Contact deleted' })
    return
  }

  res.status(404).json(notFoundMessage)
})

router.patch('/:contactId', validationMiddleware(addOrUpdateSchema), async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body)

  if (updatedContact) {
    res.json(updatedContact)
    return
  }

  res.status(404).json(notFoundMessage)
})

router.patch('/:contactId/favorite', validationMiddleware(updateFavoriteSchema), async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body)

  if (updatedContact) {
    res.json(updatedContact)
    return
  }

  res.status(404).json(notFoundMessage)
})

module.exports = router
