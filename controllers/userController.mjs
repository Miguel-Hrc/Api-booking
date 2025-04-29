import * as userService from '../services/userService.mjs';

/**
 * Update a user by ID.
 * 
 * @param {import('express').Request} req - Express request object, expects user ID in params and update data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const updateUser = async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });
  
      res.status(200).json({ success: true, message: 'User updated', data: updatedUser });
    } 
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * Get all users.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } 
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};
  
/**
 * Delete a user by ID.
 * 
 * @param {import('express').Request} req - Express request object, expects user ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const deleteUser = async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(200).json({ success: true, message: 'User deleted' });
    } 
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};
  
/**
 * Get a user by ID.
 * 
 * @param {import('express').Request} req - Express request object, expects user ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getUserById = async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } 
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};