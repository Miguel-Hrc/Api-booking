process.env.NODE_ENV = 'test';

import fs      from 'fs/promises';
import path    from 'path';
import  User from '../models/user.mjs';
import  Catway from '../models/catway.mjs';
import  Reservation from '../models/reservation.mjs';


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

afterEach(async () => {
  const catwaysCount = await Catway.countDocuments();
  if (catwaysCount === 0) {
    const catwaysJSON = await fs.readFile(
      path.join(process.cwd(), 'data', '../catways.json'),
      'utf8'
    );
    const catways = JSON.parse(catwaysJSON);
    await Catway.insertMany(catways);
  }
  const reservationsCount = await Reservation.countDocuments();
  if (reservationsCount === 0) {
    const reservationsJSON = await fs.readFile(
      path.join(process.cwd(), 'data', '../reservations.json'),
      'utf8'
    );
    const reservations = JSON.parse(reservationsJSON);
    await Reservation.insertMany(reservations);
  }
});
