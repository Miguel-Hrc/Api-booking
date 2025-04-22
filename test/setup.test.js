process.env.NODE_ENV = 'test';

import  User from '../models/user.js';
import  Catway from '../models/catway.js';
import  Reservation from '../models/reservation.js';

beforeEach((done) => { 
    Catway.deleteMany().then((result)=>{
      res.status(200).json(result);
    })
    .catch((error)=> {
      res.status(500).json(error)    
    })
    User.deleteMany().then((result)=>{
      res.status(200).json(result);
    })
    .catch((error)=> {
      res.status(500).json(error)    
    })
    Reservation.deleteMany().then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(500).json(error)    
    })
    done();
});

afterEach((done) => {
    Reservation.deleteMany().then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(500).json(error)    
    })
    Catway.deleteMany().then((result)=>{
      res.status(200).json(result);
    })
    .catch((error)=>{
      res.status(500).json(error)    
    })
    User.deleteMany().then((result)=>{
      res.status(200).json(result);
    })
    .catch((error)=>{
      res.status(500).json(error)    
    })
    done();
});