import Reservation from '../models/reservation.mjs';
import Catway from '../models/catway.mjs';
import mongoose from 'mongoose'; // nécessaire pour Types.ObjectId

/**
 * Create a new Reservation.
 *
 * @param {Object} data - Reservation data.
 * @param {string} data.catway - Catway ID.
 * @param {number} data.catwayNumber - Catway number.
 * @param {string} data.clientName - Client's name.
 * @param {string} data.boatName - Boat's name.
 * @param {Date} data.checkIn - Check-in date.
 * @param {Date} data.checkOut - Check-out date.
 * @returns {Promise<Object>} Newly created Reservation document.
 */
export const createReservation = async (data) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

/**
 * Delete a Reservation by ID and update the corresponding Catway.
 *
 * @param {string} catwayId - Catway ID.
 * @param {string} reservationId - Reservation ID.
 * @returns {Promise<Object|null>} Deleted Reservation document, or null if not found.
 */
export const deleteReservation = async (catwayId, reservationId) => {
  const reservation = await Reservation.findById(reservationId);
  if (!reservation) {
    return null;
  }
  await Reservation.findByIdAndDelete(reservationId);
  await Catway.findByIdAndUpdate(catwayId, {
    $pull: { reservations: new mongoose.Types.ObjectId(reservationId) },
  });
  return reservation;
};

/**
 * Retrieve a Reservation by ID.
 *
 * @param {string} id - Reservation ID.
 * @returns {Promise<Object|null>} Reservation document, or null if not found.
 */
export const getReservationById = async (id) => {
  const reservation = await Reservation.findById(id);
  return reservation;
};

/**
 * Retrieve all Reservations linked to a specific Catway.
 *
 * @param {string} id - Catway ID.
 * @returns {Promise<Array<Object>>} Array of Reservation documents.
 * @throws {Error} If the Catway is not found.
 */
export const getAllReservationsByCatway = async (id) => {
  const catway = await Catway.findById(id);
  if (!catway) {
    throw new Error('Catway not found');
  }
  const reservations = await Promise.all(
    catway.reservations.map((reservationId) => Reservation.findById(reservationId))
  );
  return reservations;
};