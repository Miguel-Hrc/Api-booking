import * as catwayService from '../services/catwayService.mjs';

/**
 * Create a new catway.
 * 
 * @param {import('express').Request} req - Express request object containing catway data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const createCatway = async (req, res) => {
  try {
    const temp = {
      catwayNumber: req.body.catwayNumber,
      type: req.body.type,
      catwayState: req.body.catwayState,
    };
    const newCatway = await catwayService.createCatway(temp);
    res.status(201).json({ success: true, message: 'Catway created', data: newCatway });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Update the state of a catway by its ID.
 * 
 * @param {import('express').Request} req - Express request object containing catway ID in params and new state in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const updateCatway = async (req, res) => {
  try {
    const temp = {
      catwayState: req.body.catwayState,
    };
    const updatedCatway = await catwayService.updateCatway(req.params.id, temp);
    if (!updatedCatway) {
      return res.status(404).json({ success: false, message: 'Catway not found' });
    }
    res.status(200).json({ success: true, message: 'Catway updated', data: updatedCatway });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Retrieve all catways.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getAllCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.status(200).json({ success: true, data: catways });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Delete a catway by its ID.
 * 
 * @param {import('express').Request} req - Express request object containing catway ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const deleteCatway = async (req, res) => {
  try {
    await catwayService.deleteCatway(req.params.id);
    res.status(204).json({ success: true, message: 'Catway deleted' });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Retrieve a catway by its ID.
 * 
 * @param {import('express').Request} req - Express request object containing catway ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getCatwayById = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).json({ success: false, message: 'Catway not found' });
    }
    res.status(200).json({ success: true, data: catway });
  } 
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};