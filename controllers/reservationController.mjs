import * as reservationService from '../services/reservationService.mjs';
import Catway from '../models/catway.mjs';

/**
 * Get a reservation by its ID.
 * 
 * @param {import('express').Request} req - Express request object, expects reservation ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getReservationById = async (req, res) => {
    try {
      const reservation = await reservationService.getReservationById(req.params.idReservation);
      if (!reservation) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      res.status(200).json({ success: true, data: reservation });
    } 
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * Create a reservation and link it to a Catway.
 * 
 * @param {import('express').Request} req - Express request object, expects catway ID in params and reservation data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const createReservation = async (req, res, next) => {
  try {
    const catwayN = await Catway.findOne({ _id: req.params.id }).select(['catwayNumber', '-_id']);
    const temp = ({
      catway: req.params.id,
      catwayNumber: catwayN.catwayNumber,
      clientName: req.body.clientName,
      boatName: req.body.boatName,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    });
    const newReservation = await reservationService.createReservation(temp);
    try {
      await Catway.findByIdAndUpdate(req.params.id, {
        $push: { reservations: newReservation },
      });
    } 
    catch (err) {
      next(err);
    }
    res.status(201).json({ success: true, message: 'Reservation created', data: newReservation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get all reservations for a specific Catway.
 * 
 * @param {import('express').Request} req - Express request object, expects catway ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getAllReservationsByCatway = async (req, res) => {
    try {
      const reservations = await reservationService.getAllReservationsByCatway(req.params.id);
      res.status(200).json({ success: true, data: reservations });
    } 
    catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * Delete a reservation from a specific Catway.
 * 
 * @param {import('express').Request} req - Express request object, expects catway ID and reservation ID in params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const deleteReservation = async (req, res) => {
    try {
      const { id: catwayId, reservationId } = req.params;
  
      const deletedReservation = await reservationService.deleteReservation(catwayId, reservationId);
  
      return res.status(200).json({
        success: true,
        message: 'Reservation deleted',
        data: deletedReservation,
      });
    } 
    catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
};