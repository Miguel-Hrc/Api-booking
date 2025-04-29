import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.mjs'; 
import jwt from 'jsonwebtoken';

const { expect } = chai;
chai.use(chaiHttp);

describe('Controller', () => {

  it('should register + login a user, create a catway and get all catways', (done) => {
    const user = {
      name: 'Peterg',
      firstname: 'Jeang',
      email: 'mailg@petersen.com',
      password: '123456g',
    };
    chai.request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        chai.request(app)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(200); 
            const userId = res.body._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const catway = {
              catwayNumber: 36,
              type: 'short',
              catwayState: 'Good condition',
            };
            chai.request(app)
              .post('/catways') 
              .set('Cookie', `access_token=${token}`)
              .send(catway)
              .end((err, res) => {
                expect(res.status).to.equal(201); 
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);
                chai.request(app)
                    .get('/catways/')
                    .set('Cookie', `access_token=${token}`)
                    .end((err, res) => {
                    console.log("GET /catways response:", res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).to.be.at.least(0);
                    done();
                });
              });
          });
      });
  });

  it('should register + login a user, create a catway', (done) => {
    const user = {
      name: 'Peters',
      firstname: 'Jeans',
      email: 'mails@petersen.com',
      password: '123456s',
    };
    chai.request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        chai.request(app)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(200); 
            const userId = res.body._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const catway = {
              catwayNumber: 37,
              type: 'short',
              catwayState: 'Good condition',
            };
            chai.request(app)
              .post('/catways') 
              .set('Cookie', `access_token=${token}`)
              .send(catway)
              .end((err, res) => {
                expect(res.status).to.equal(201); 
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);
                done();
              });
          });
      });
  });

  it('should register + login a user, create and get by id catway', (done) => {
    const user = {
      name: 'Petery',
      firstname: 'Jeany',
      email: 'maily@petersen.com',
      password: '123456y',
    };
    chai.request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        chai.request(app)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            const userId = res.body._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const catway = {
              catwayNumber: 38,
              type: 'long',
              catwayState: 'Bad condition',
            };
            chai.request(app)
              .post('/catways/')
              .set('Cookie', `access_token=${token}`)
              .send(catway)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);
                const catwayId = res.body.data._id;
                chai.request(app)
                  .get(`/catways/${catwayId}`)
                  .set('Cookie', `access_token=${token}`)
                  .end((err, res) => {
                    if (err) return done(err);
                    console.log("GET /catways response:", res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data._id).to.equal(catwayId);
                    done();
                  });
              });
          });
      });
  });

it('should register + login a user, create and update catway', (done) => {
    const user = {
      name: "Petera",
      firstname: "Jeana",
      email: "maila@petersen.com",
      password: "123456a",
    };
    chai.request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        chai.request(app)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200); 
            const userId = res.body._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const catway = {
              catwayNumber: 39,
              type: "long",
              catwayState: "Bad condition",
            };
            const catwayUpdated = {
              catwayState: "Good condition",
            };
            chai.request(app)
              .post('/catways')
              .set('Cookie', `access_token=${token}`)
              .send(catway)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);
                const catwayId = res.body.data._id;
                chai.request(app)
                  .patch(`/catways/${catwayId}`)
                  .set('Cookie', `access_token=${token}`)
                  .send(catwayUpdated)
                  .end((err, res) => {
                    if (err) return done(err);
                    console.log("PATCH response:", res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body.data).to.have.property('catwayState').that.equals(catwayUpdated.catwayState);
                    done();  
                  });
              });
          });
      });
  });
  it('should register + login a user, create and delete catway', (done) => {
    const user = {
      name: "Petere",
      firstname: "Jeane",
      email: "maile@petersen.com",
      password: "123456e",
    };
    chai.request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        chai.request(app)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200); 
            const userId = res.body._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const catway = {
              catwayNumber: 40,
              type: "long",
              catwayState: "Bad condition",
            };
            chai.request(app)
              .post('/catways')
              .set('Cookie', `access_token=${token}`)
              .send(catway)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);                            
                const catwayId = res.body.data._id;
                chai.request(app)
                  .delete(`/catways/${catwayId}`)
                  .set('Cookie', `access_token=${token}`)
                  .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(204);
                    expect(res.body).to.be.empty;
                    done();
                  });
              });
          });
      });
  });
  it('should register + login a user, create a catway, create a reservation and get all reservations', (done) => {
    const user = {
      name: "Peteru",
      firstname: "Jeanu",
      email: "mailu@petersen.com",
      password: "123456u",
    };
    chai.request(app)
      .post('/auth/register')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        chai.request(app)
          .post('/auth/login')
          .send(user)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            const userId = res.body._id;
            const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            const catway = {
              catwayNumber: 41,
              type: "short",
              catwayState: "Good condition",
            };
            chai.request(app)
              .post('/catways')
              .set('Cookie', `access_token=${token}`)
              .send(catway)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);
                const catwayId = res.body.data._id;
                const reservation = {
                  catway: catwayId,
                  clientName: "Peteru",
                  boatName: "Black Pearl",
                  checkIn: "2024-01-18",
                  checkOut: "2024-01-20",
                };
                chai.request(app)
                  .post(`/catways/${catwayId}/reservations`)
                  .set('Cookie', `access_token=${token}`)
                  .send(reservation)
                  .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.an('object');
                    chai.request(app)
                      .get(`/catways/${catwayId}/reservations`)
                      .set('Cookie', `access_token=${token}`)
                      .end((err, res) => {
                        if (err) return done(err);
                        console.log("GET /catways response:", res.body);
                        expect(res.status).to.equal(200); 
                        expect(res.body).to.have.property('success', true); 
                        expect(res.body).to.have.property('data'); 
                        expect(res.body.data).to.be.an('array'); 
                        expect(res.body.data.length).to.be.at.least(0); 
                        done();
                      });
                  });
              });
          });
      });
  });


    it('should register + login a user, create a catway + create a reservation', (done) => {
        let user = {
            name: "Peterd",
            firstname: "Jeand",
            email: "maild@petersen.com",
            password: "123456d",
        }
        chai.request(app)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(201);
                    expect(res.body).to.be.an('object');
                    chai.request(app)
                    .post('/auth/login')
                    .send(user)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 42,
                            type: "short",
                            catwayState: "Good condition",
                        };
                        chai.request(app)
                            .post('/catways')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.equal(201);
                                expect(res.body).to.have.property('success', true);
                                expect(res.body).to.have.property('data');
                                expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                                expect(res.body.data).to.have.property('type').that.equals(catway.type);
                                expect(res.body.data).to.have.property('catwayState').that.equals(catway.catwayState);
                                const catwayId = res.body.data._id;
                                let reservation =
                                {
                                    catway: catwayId,
                                    clientName: "Peterd",
                                    boatName: "Black Pearl",
                                    checkIn: "2024-01-18",
                                    checkOut: "2024-01-20",
                                };
                                chai.request(app)
                                    .post(`/catways/${catwayId}/reservations`)
                                    .set('Cookie', `access_token=${token}`)
                                    .send(reservation)
                                    .end((err, res) => {
                                        if (err) return done(err);
                                        expect(res.status).to.equal(201);
                                        expect(res.body).to.be.an('object');
                                    done();
                                });
                            }); 
                    });
                });  
            });

           
    it('should register + login a user, create a catway + get by id a reservation', (done) => {
        let user = {
            name: "Peteri",
            firstname: "Jeani",
            email: "maili@petersen.com",
            password: "123456i",
        }
        chai.request(app)
            .post('/auth/register')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                chai.request(app)
                    .post('/auth/login')
                    .send(user)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 43,
                            type: "short",
                            catwayState: "Good condition",
                        };
                                chai.request(app)
                                    .post('/catways')
                                    .set('Cookie', `access_token=${token}`)
                                    .send(catway)
                                    .end((err, res) => {
                                        if (err) return done(err);
                                        expect(res.status).to.equal(201);
                                        expect(res.body).to.have.property('success', true);
                                        expect(res.body).to.have.property('data');
                                        expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                                        const catwayId = res.body.data._id;
                                let reservation =
                                {
                                    catway: catwayId,
                                    clientName: "Peteri",
                                    boatName: "Black Pearl",
                                    checkIn: "2024-01-21",
                                    checkOut: "2024-01-24",
                                };
                                        chai.request(app)
                                            .post(`/catways/${catwayId}/reservations/`)
                                            .set('Cookie', `access_token=${token}`)
                                            .send(reservation)
                                            .end((err, res) => {
                                                if (err) return done(err);
                                                console.log('Created Reservation:', res.body);
                                                expect(res.status).to.equal(201);
                                                expect(res.body).to.be.an('object');
                                                expect(Number(res.body.data.catwayNumber)).to.equal(catway.catwayNumber);
                                                const reservationId = res.body.data._id;
                                                console.log('Reservation ID:', reservationId);
                                                chai.request(app)
                                                    .get(`/catways/${catwayId}/reservations/${reservationId}`)
                                                    .set('Cookie', `access_token=${token}`)
                                                    .end((err, res) => {
                                                        if (err) return done(err);5
                                                        expect(res.status).to.equal(200);
                                                        console.log("Reservation details:", res.body);
                                                        done();
                                        });
                                });
                            }); 
                    });
            });  
    });  

    it('should register + login a user, create a catway + delete a reservation', (done) => {
                let user = {
                  name: "Peterf",
                  firstname: "Jeanf",
                  email: "mailf@petersen.com",
                  password: "123456f",
                };
                chai.request(app)
                    .post('/auth/register')
                    .send(user)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.equal(201);
                        expect(res.body).to.be.an('object');
                        chai.request(app)
                            .post('/auth/login')
                            .send(user)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.equal(200);
                                const userId = res.body._id;
                                const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                                let catway = {
                                catwayNumber: 44,
                                type: "short",
                                catwayState: "Good condition",
                                };
                                chai.request(app)
                                    .post('/catways')
                                    .set('Cookie', `access_token=${token}`)
                                    .send(catway)
                                    .end((err, res) => {
                                        if (err) return done(err);
                                        expect(res.status).to.equal(201);
                                        expect(res.body).to.have.property('success', true);
                                        expect(res.body).to.have.property('data');
                                        expect(res.body.data).to.have.property('catwayNumber').that.equals(catway.catwayNumber);
                                        const catwayId = res.body.data._id;
                                        let reservation = {
                                        catway: catwayId,
                                        clientName: "Peteram",
                                        boatName: "Black Pearl",
                                        checkIn: "2024-01-21",
                                        checkOut: "2024-01-24",
                                        };
                                        chai.request(app)
                                            .post(`/catways/${catwayId}/reservations/`)
                                            .set('Cookie', `access_token=${token}`)
                                            .send(reservation)
                                            .end((err, res) => {
                                                if (err) return done(err);
                                                console.log('Created Reservation:', res.body);
                                                expect(res.status).to.equal(201);
                                                expect(res.body).to.be.an('object');
                                                expect(Number(res.body.data.catwayNumber)).to.equal(catway.catwayNumber);
                                                const reservationId = res.body.data._id;
                                                console.log('Reservation ID:', reservationId);
                                                chai.request(app)
                                                    .get(`/catways/${catwayId}/reservations/${reservationId}`)
                                                    .set('Cookie', `access_token=${token}`)
                                                    .end((err, res) => {
                                                        if (err) return done(err);
                                                        expect(res.status).to.equal(200);
                                                        console.log("Reservation details:", res.body);
                                                        chai.request(app)
                                                            .delete(`/catways/${catwayId}/reservations/${reservationId}`)
                                                            .set('Cookie', `access_token=${token}`)
                                                            .end((err, res) => {
                                                                console.log("DELETE response:", res.body);
                                                                if (err) return done(err);
                                                                expect(res.status).to.equal(200);
                                                                expect(res.body).to.have.property('success', true);
                                                                expect(res.body).to.have.property('message').that.includes('deleted');
                                                                done();
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
    });
});

