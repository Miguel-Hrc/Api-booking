import User from "../models/user.mjs";
import bcrypt from 'bcryptjs';

/**
 * Update an existing User.
 *
 * @param {string} id - User ID.
 * @param {Object} body - Fields to update.
 * @param {string} [body.name] - Updated name.
 * @param {string} [body.firstname] - Updated firstname.
 * @param {string} [body.email] - Updated email.
 * @param {boolean} [body.isAdmin] - Updated admin status.
 * @param {string} [body.password] - Updated password.
 * @returns {Promise<Object|null>} Updated User document, or null if not found.
 */
export const updateUser = async (id, body) => {
  let user = await User.findById(id);
  if (!user) return null;
  const fieldsToUpdate = {
    name: body.name,
    firstname: body.firstname,
    email: body.email,
    isAdmin: body.isAdmin,
  };
  if (body.password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    fieldsToUpdate.password = hash;
  }
  Object.keys(fieldsToUpdate).forEach((key) => {
    if (fieldsToUpdate[key] !== undefined && fieldsToUpdate[key] !== "") {
      user[key] = fieldsToUpdate[key];
    }
  });
  await user.save();
  return user;
};

/**
 * Create a new User.
 *
 * @param {Object} data - User data.
 * @returns {Promise<Object>} Newly created User document.
 */
export const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

/**
 * Retrieve all Users.
 *
 * @returns {Promise<Array<Object>>} Array of User documents.
 */
export const getAllUsers = async () => {
  return await User.find();
};

/**
 * Delete a User by ID.
 *
 * @param {string} id - User ID.
 * @returns {Promise<Object|null>} Deleted User document, or null if not found.
 */
export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

/**
 * Retrieve a User by ID.
 *
 * @param {string} id - User ID.
 * @returns {Promise<Object|null>} User document, or null if not found.
 */
export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};