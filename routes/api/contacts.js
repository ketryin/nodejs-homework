const express = require('express')
const router = express.Router()
const validationMiddleware = require('../../middlewares/validationMiddleware')
const authMiddleware = require('../../middlewares/authMiddleware')
const { addOrUpdateSchema, updateFavoriteSchema } = require('../../validations/validationSchemas')

const listContacts = require('../../model/contacts/listContacts')
const getContactById = require('../../model/contacts/getContactById')
const addContact = require('../../model/contacts/addContact')
const removeContact = require('../../model/contacts/removeContact')
const updateContact = require('../../model/contacts/updateContact')

const notFoundMessage = { message: 'Not found' }

router.get('/', authMiddleware, async (req, res, next) => {
  const contactsList = await listContacts(req.userId)
  res.json(contactsList)
})

router.get('/:contactId', authMiddleware, async (req, res, next) => {
  const contact = await getContactById(req.params.contactId, req.userId)

  if (contact) {
    res.json(contact)
    return
  }

  res.status(404).json(notFoundMessage)
})

router.post('/', authMiddleware, validationMiddleware(addOrUpdateSchema), async (req, res, next) => {
  const newContact = await addContact(req.body, req.userId)
  res.status(201).json(newContact)
})

router.delete('/:contactId', authMiddleware, async (req, res, next) => {
  const isSuccess = await removeContact(req.params.contactId, req.userId)

  if (isSuccess) {
    res.json({ message: 'Contact deleted' })
    return
  }

  res.status(404).json(notFoundMessage)
})

router.patch('/:contactId', authMiddleware, validationMiddleware(addOrUpdateSchema), async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body, req.userId)

  if (updatedContact) {
    res.json(updatedContact)
    return
  }

  res.status(404).json(notFoundMessage)
})

router.patch('/:contactId/favorite', authMiddleware, validationMiddleware(updateFavoriteSchema), async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body, req.userId)

  if (updatedContact) {
    res.json(updatedContact)
    return
  }

  res.status(404).json(notFoundMessage)
})

module.exports = router
