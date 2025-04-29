import { expect } from 'chai';
import sinon from 'sinon';
import Reservation from '../models/reservation.mjs';
import * as reservationService from '../services/reservationService.mjs';
import Catway from '../models/catway.mjs';
import mongoose from 'mongoose'

describe('createReservation', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should create a new reservation and save it to the database', async () => {
    const inputData = {
      catway: 'catwayId123',
      catwayNumber: 8,
      clientName: 'Alice',
      boatName: 'Sea Breeze',
      checkIn: '2024-01-21',
      checkOut: '2024-01-24',
    };
    const savedReservationMock = {
      _id: 'resId456',
      ...inputData,
    };
    const saveStub = sinon
      .stub(Reservation.prototype, 'save')
      .resolves(savedReservationMock);
    const result = await reservationService.createReservation(inputData);
    sinon.assert.calledOnce(saveStub);             
    expect(result).to.deep.equal(savedReservationMock);
  });
});

describe('deleteReservation', () => {
    const catwayId = new mongoose.Types.ObjectId().toHexString();
    const reservationId = new mongoose.Types.ObjectId().toHexString();
    afterEach(() => {
      sinon.restore();
    });
    it('should delete an existing reservation and remove it from the catway', async () => {
      const foundReservationMock = {
        _id: reservationId,
        catway: catwayId,
        clientName: 'Alice',
        boatName: 'Sea Breeze',
        checkIn: '2024-01-21',
        checkOut: '2024-01-24',
      };
      sinon.stub(Reservation, 'findById').resolves(foundReservationMock);
      const deleteResStub = sinon.stub(Reservation, 'findByIdAndDelete').resolves(foundReservationMock);
      const updateCatwayStub = sinon.stub(Catway, 'findByIdAndUpdate').resolves({});
      const result = await reservationService.deleteReservation(catwayId, reservationId);
      sinon.assert.calledOnceWithExactly(Reservation.findById, reservationId);
      sinon.assert.calledOnceWithExactly(Reservation.findByIdAndDelete, reservationId);
      sinon.assert.calledOnceWithExactly(
        Catway.findByIdAndUpdate,
        catwayId,
        { $pull: { reservations: new mongoose.Types.ObjectId(reservationId) } }
      );
      expect(result).to.deep.equal(foundReservationMock);
    });
});

describe('getReservationById', () => {
  afterEach(() => {
    sinon.restore(); 
  });
  it('should return the reservation when it exists', async () => {
    const reservationId =new mongoose.Types.ObjectId().toHexString();
    const foundReservation = {
      _id: reservationId,
      catway: new mongoose.Types.ObjectId().toHexString(),
      clientName: 'Bob',
      boatName: 'Wind Rider',
      checkIn: '2024-05-01',
      checkOut: '2024-05-05',
    };
    const findByIdStub = sinon
      .stub(Reservation, 'findById')
      .resolves(foundReservation);
    const result = await reservationService.getReservationById(reservationId);
    sinon.assert.calledOnceWithExactly(findByIdStub, reservationId);
    expect(result).to.deep.equal(foundReservation);
  });
});

describe('getAllReservationsByCatway', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return an array of reservations when catway exists', async () => {
    const catwayId = new mongoose.Types.ObjectId().toHexString();
    const resId1   = new mongoose.Types.ObjectId().toHexString();
    const resId2   = new mongoose.Types.ObjectId().toHexString();
    sinon.stub(Catway, 'findById').resolves({
      _id: catwayId,
      reservations: [resId1, resId2],
    });
    const reservation1 = { _id: resId1, clientName: 'A' };
    const reservation2 = { _id: resId2, clientName: 'B' };
    const findStub = sinon.stub(Reservation, 'findById');
    findStub.withArgs(resId1).resolves(reservation1);
    findStub.withArgs(resId2).resolves(reservation2);
    const result = await reservationService.getAllReservationsByCatway(catwayId);
    sinon.assert.calledOnceWithExactly(Catway.findById, catwayId);
    sinon.assert.calledWith(findStub, resId1);
    sinon.assert.calledWith(findStub, resId2);
    expect(result).to.deep.equal([reservation1, reservation2]);
  });
});  