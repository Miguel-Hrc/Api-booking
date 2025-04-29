import { expect } from 'chai';
import sinon from 'sinon';
import Catway from '../models/catway.mjs';
import * as catwayService from '../services/catwayService.mjs';

describe('createCatway', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should create a new catway and save it to the database', async () => {
    const catwayData = {
      catwayNumber: 1234,
      type: 'Dock',
      catwayState: 'Active',
    };
    const savedCatwayMock = {
      _id: 'fakeId123',
      ...catwayData,
    };
    const saveStub = sinon
      .stub(Catway.prototype, 'save')
      .resolves(savedCatwayMock);
    const result = await catwayService.createCatway(catwayData);
    sinon.assert.calledOnce(saveStub);
    expect(result).to.deep.equal(savedCatwayMock);
  });});

describe('updateCatway', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should update a catway and return the updated document', async () => {
    const id = 'fakeCatwayId123';
    const updateData = { catwayState: 'Active' };
    const updatedCatwayMock = {
      _id: id,
      catwayNumber: 42,
      type: 'Dock',
      catwayState: 'Inactive',
    };
    const findByIdAndUpdateStub = sinon.stub(Catway, 'findByIdAndUpdate').resolves(updatedCatwayMock);
    const result = await catwayService.updateCatway(id, updateData);
    expect(findByIdAndUpdateStub.calledOnceWithExactly(id, updateData, { new: true, runValidators: true })).to.be.true;
    expect(result).to.deep.equal(updatedCatwayMock);
  });
});

describe('getAllCatways', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should return an array of catways when find succeeds', async () => {
    const catwaysMock = [
      { _id: 'id1', catwayNumber: 1, type: 'Dock', catwayState: 'Active' },
      { _id: 'id2', catwayNumber: 2, type: 'Dock', catwayState: 'Inactive' },
    ];
    const findStub = sinon.stub(Catway, 'find').resolves(catwaysMock);
    const result = await catwayService.getAllCatways();
    sinon.assert.calledOnce(findStub);
    expect(result).to.deep.equal(catwaysMock);
  });
});

describe('deleteCatway', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should delete a catway and return the deleted document', async () => {
    const id = 'fakeCatwayId123';
    const deletedCatwayMock = {
      _id: id,
      catwayNumber: 42,
      type: 'Dock',
      catwayState: 'Inactive',
    };
    const deleteStub = sinon
      .stub(Catway, 'findByIdAndDelete')
      .resolves(deletedCatwayMock);
    const result = await catwayService.deleteCatway(id);
    sinon.assert.calledOnceWithExactly(deleteStub, id);
    expect(result).to.deep.equal(deletedCatwayMock);
  });});

describe('getCatwayById', () => {
    afterEach(() => {
      sinon.restore(); 
    });
    it('should return the catway when found', async () => {
      const id = 'fakeCatwayId123';
      const foundCatwayMock = {
        _id: id,
        catwayNumber: 99,
        type: 'Dock',
        catwayState: 'Active',
      };
      const findByIdStub = sinon.stub(Catway, 'findById').resolves(foundCatwayMock);
      const result = await catwayService.getCatwayById(id);
      sinon.assert.calledOnceWithExactly(findByIdStub, id);
      expect(result).to.deep.equal(foundCatwayMock);
    });
});