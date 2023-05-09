const contactsmodels = require('../models/contacts');
const { HttpCode } = require('../helpers/constans');

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsmodels.listContacts(userId);
    return res.json({
      status: 'Success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsmodels.getContactById(req.params.contactId, userId);

    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'Error',
        code: HttpCode.BAD_REQUEST,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsmodels.addContact({ ...req.body, owner: userId });
    return res.status(HttpCode.CREATED).json({
      status: 'Success',
      code: HttpCode.CREATED,
      message: 'New contact has been added',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsmodels.removeContact(req.params.contactId, userId);

    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.OK,
        message: 'Contact has been deleted',
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'Error',
        code: HttpCode.BAD_REQUEST,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsmodels.updateContact(
      req.params.contactId,
      req.body,
      userId,
    );

    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.OK,
        message: 'Contact has been updated',
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'Error',
        code: HttpCode.BAD_REQUEST,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};