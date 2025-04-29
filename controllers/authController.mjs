import * as authService from '../services/authService.mjs';

/**
 * Register a new user.
 *
 * @param {import('express').Request} req - Express request object containing user data in body.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const register = async (req, res, next) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } 
  catch (err) {
    next(err);
  }
};

/**
 * Log in an existing user and return a JWT token.
 *
 * @param {import('express').Request} req - Express request object containing login credentials.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const login = async (req, res, next) => {
  try {
    const { userData, token } = await authService.loginUser(req.body);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userData);
  } 
  catch (err) {
    next(err);
  }
};