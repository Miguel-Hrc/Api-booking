import Catway from '../models/catway.mjs';

/**
 * Create a new Catway.
 *
 * @param {Object} data - Catway data.
 * @param {number} data.catwayNumber - Catway number.
 * @param {string} data.type - Type of the catway.
 * @param {string} data.catwayState - State of the catway.
 * @returns {Promise<Object>} Newly created Catway document.
 */
export const createCatway = async (data) => {
  const catway = new Catway(data);
  return await catway.save();
};

/**
 * Update an existing Catway by ID.
 *
 * @param {string} id - Catway ID.
 * @param {Object} data - Fields to update.
 * @returns {Promise<Object|null>} Updated Catway document, or null if not found.
 */
export const updateCatway = async (id, data) => {
  return await Catway.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

/**
 * Retrieve all Catways.
 *
 * @returns {Promise<Array<Object>>} Array of Catway documents.
 */
export const getAllCatways = async () => {
  return await Catway.find();
};

/**
 * Delete a Catway by ID.
 *
 * @param {string} id - Catway ID.
 * @returns {Promise<Object|null>} Deleted Catway document, or null if not found.
 */
export const deleteCatway = async (id) => {
  return await Catway.findByIdAndDelete(id);
};

/**
 * Retrieve a single Catway by ID.
 *
 * @param {string} id - Catway ID.
 * @returns {Promise<Object|null>} Catway document, or null if not found.
 */
export const getCatwayById = async (id) => {
  const catway = await Catway.findById(id);
  return catway;
};