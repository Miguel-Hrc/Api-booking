import User from '../models/user.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.mjs';

/**
 * Generate a JWT token for a user.
 *
 * @param {Object} user - User object from database.
 * @returns {string} JWT token.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
};

/**
 * Register a new user.
 *
 * @param {Object} body - Request body containing user registration data.
 * @param {string} body.name - User's last name.
 * @param {string} body.firstname - User's first name.
 * @param {string} body.email - User's email address.
 * @param {string} body.password - User's plain password.
 * @param {boolean} [body.isAdmin=false] - Whether the user is an admin.
 * @returns {Promise<Object>} Newly created user document.
 */
export const registerUser = async (body) => {
  const { name, firstname, email, password, isAdmin } = body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({
    name,
    firstname,
    email,
    password: hash,
    isAdmin,
  });
  return await newUser.save();
};

/**
 * Authenticate a user and generate a JWT token.
 *
 * @param {Object} body - Request body containing login credentials.
 * @param {string} body.name - User's name.
 * @param {string} body.password - User's password.
 * @returns {Promise<Object>} An object containing user data and JWT token.
 * @throws {Error} If the user is not found or password is incorrect.
 */
export const loginUser = async (body) => {
  const { name, password } = body;
  const user = await User.findOne({ name });
  if (!user) throw createError(404, "User not found");
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw createError(400, "Wrong password or name");
  const token = generateToken(user);
  const { password: pw, isAdmin, ...otherDetails } = user._doc;
  return {
    userData: { details: { ...otherDetails }, isAdmin },
    token,
  };
};

export default {
  registerUser,
  loginUser,
};
