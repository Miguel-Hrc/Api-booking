import Catway from '../models/catway.js';
import  Reservation  from '../models/reservation.js';



export const getByIdReservation = async (req, res, next) => {
    const reservationId = req.params.idReservation;
    try {
        let reservation = await Reservation.findById({ _id  : reservationId});
        if (reservation) {
            return res.status(200).json(reservation);
        }
        return res.status(404).json('reservation_not_found');
    } 
    catch (error) {
        return res.status(501).json(error);
    }
}

export const addReservation = async (req, res, next) => {
    const id = req.params.id
    const catwayN = await Catway.findOne({_id : id}).select(['catwayNumber', '-_id']);
    const temp = ({
        catwayNumber: catwayN,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
    });
    try {
        let reservation = await Reservation.create(temp);  
        try {
            await Catway.findByIdAndUpdate(id, {
              $push: { reservations: reservation },
            });
        } 
        catch (err) {
          next(err);
        }
        return res.status(201).json(reservation);
    }
    catch (error) {
        return res.status(501).json(error);
    }
}

export const deleteReservation = async (req, res, next) => {
  const reservationId = req.params.idReservation;
  const catwayId = req.params.id;
  try {
    const deleted = await Reservation.findByIdAndDelete(reservationId);
    if (!deleted) {
      return res.status(404).json({ message: 'reservation_not_found' });
    }
    await Catway.findByIdAndUpdate(catwayId, {
      $pull: { reservations: reservationId }
    });
    return res.status(200).json({ message: 'Reservation_deleted_successfully' });
  } 
  catch (err) {
    next(err);
  }
}


export const getReservations = async (req, res, next) => {
    try {
      const catway = await Catway.findById(req.params.id);
      const list = await Promise.all(
        catway.reservations.map((reservation) => {
          return Reservation.findById(reservation);
        })
      );
      res.status(200).json(list)
    } 
    catch (err) {
      next(err);
    }
  };