import { verifyUser } from "../middlewares/private.mjs";
import  {getReservationById, deleteReservation, createReservation, getAllReservationsByCatway}  from "../controllers/reservationController.mjs";
import express from "express";

var router = express.Router();

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     description: Get secific reservation
 *     tags:
 *      - Reservation
 *     parameters:
 *      - name: id
 *        description: id of the catway
 *        in: path
 *        required: true
 *        type: string
 *      - name: idReservation
 *        description: id of the reservation
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Success
 */
  router.get('/catways/:id/reservations/:idReservation', verifyUser, getReservationById);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     description: Post reservation by ID
 *     tags:
 *       - Reservation
 *     parameters:
 *       - name: id
 *         description: id of the catway
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               checkIn:
 *                 type: date
 *               checkOut:
 *                 type: date
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 */
  router.post('/catways/:id/reservations', verifyUser , createReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     description: Delete specific reservation
 *     tags:
 *       - Reservation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the catway
 *         schema:
 *           type: string
 *       - name: idReservation
 *         in: path
 *         required: true
 *         description: ID of the reservation
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Reservation deleted successfully
 */
  router.delete('/catways/:id/reservations/:idReservation', verifyUser , deleteReservation);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     description: Get all reservations
 *     tags:
 *      - Reservation
 *     parameters:
 *      - name: id
 *        description: id of the catway
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/catways/:id/reservations', verifyUser, getAllReservationsByCatway);


export default router;