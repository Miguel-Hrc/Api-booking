import  app from '../app.js';
import * as chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
const { expect } = chai;

chai.use(chaiHttp);

import {request} from 'chai-http';

describe('Tests', () => {


    it('should register + login a user, create a catway and get all users', (done) => {
        let user = {
            name: "Peters",
            firstname: "Jeans",
            email: "mails@petersen.com",
            password: "123456s",
        }
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);   
                expect(res.body).to.be.a('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {                        
                        expect(res.status).to.be.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 15,
                            type: "short",
                            catwayState: "Good condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property('catwayNumber');
                                expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                expect(res.body.type).to.be.equal(catway.type);
                                expect(res.body.catwayState).to.be.equal(catway.catwayState);
                            });
                            request.execute(app)
                                    .get('/catways/')
                                    .set('Cookie', `access_token=${token}`)
                                    .end((err, res) => {
                                        console.log("GET /catways response:", res.body);
                                        expect(res.status).to.equal(200);
                                        expect(res.body).to.be.an('array');
                                        expect(res.body.length).to.be.at.least(0); 
                                        done();
                                    });    
                    });
            });
    });

    it('should register + login a user, create a catway', (done) => {
        let user = {
            name: "Peter",
            firstname: "Jean",
            email: "mail@petersen.com",
            password: "123456",
        }
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);   
                expect(res.body).to.be.a('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {                        
                        expect(res.status).to.be.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 1,
                            type: "short",
                            catwayState: "Good condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property('catwayNumber');
                                expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                expect(res.body.type).to.be.equal(catway.type);
                                expect(res.body.catwayState).to.be.equal(catway.catwayState);
                                done();
                            });
                    });
            });
    });


    it('should register + login a user, create and get by id catway', (done) => {
        const user = {
            name: "Petery",
            firstname: "Jeany",
            email: "maily@petersen.com",
            password: "123456y",
        };
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        const catway = {
                            catwayNumber: 5,
                            type: "long",
                            catwayState: "Bad condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.equal(201);
                                const catwayId = res.body._id;
                                request.execute(app)
                                    .get(`/catways/${catwayId}`)
                                    .set('Cookie', `access_token=${token}`)
                                    .end((err, res) => {
                                        if (err) return done(err);
                                        console.log("GET /catways response:", res.body);
                                        expect(res.status).to.equal(200);
                                        expect(res.body.catwayNumber).to.equal(5);
                                        done();
                                    });
                            });
                    });
            });
    });


    it('should register + login a user, create and update catway', (done) => {
        let user = {
            name: "Petera",
            firstname: "Jeana",
            email: "maila@petersen.com",
            password: "123456a",
        }
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);   
                expect(res.body).to.be.a('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {                        
                        expect(res.status).to.be.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 3,
                            type: "long",
                            catwayState: "Bad condition",
                        };
                        let catwayUpdated =
                        {
                            catwayState: "Good condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property('catwayNumber');
                                expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                expect(res.body.type).to.be.equal(catway.type);
                                expect(res.body.catwayState).to.be.equal(catway.catwayState);                           
                            const catwayId = res.body._id;
                            request.execute(app)
                                    .patch(`/catways/${catwayId}`)
                                    .set('Cookie', `access_token=${token}`)
                                    .send(catwayUpdated)
                                    .end((err, res) => {
                                        console.log("PATCH response:", res.body);
                                        expect(res.status).to.be.equal(200)     
                                        expect(res.body.catwayState).to.be.equal(catwayUpdated.catwayState);                   
                                        done();
                                    });        
                            });
                    });
            });
    });


    it('should register + login a user, create and delete catway', (done) => {
        let user = {
            name: "Petere",
            firstname: "Jeane",
            email: "maile@petersen.com",
            password: "123456e",
        }
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);   
                expect(res.body).to.be.a('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {                        
                        expect(res.status).to.be.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 4,
                            type: "long",
                            catwayState: "Bad condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);                                
                            const catwayId = res.body._id;
                            request.execute(app)
                                    .delete(`/catways/${catwayId}`)
                                    .set('Cookie', `access_token=${token}`)
                                    .end((err, res) => {
                                        expect(res.status).to.be.equal(204);                                               
                                        done();
                                    });        
                            });
                    });
            });
    });


    it('should register + login a user, create a catway + create a reservation and get all reservations', (done) => {
        let user = {
            name: "Peteru",
            firstname: "Jeanu",
            email: "mailu@petersen.com",
            password: "123456u",
        }
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);   
                expect(res.body).to.be.a('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {                        
                        expect(res.status).to.be.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 6,
                            type: "short",
                            catwayState: "Good condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property('catwayNumber');
                                expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                expect(res.body.type).to.be.equal(catway.type);
                                expect(res.body.catwayState).to.be.equal(catway.catwayState);
                                const catwayId = res.body._id;
                                let reservation =
                                {
                                    catway: catwayId,
                                    catwayNumber: 6,
                                    clientName: "Peteru",
                                    boatName: "Black Pearl",
                                    checkIn: "2024-01-18",
                                    checkOut: "2024-01-20",
                                };
                                request.execute(app)
                                .post(`/catways/${catwayId}/reservations`)
                                .set('Cookie', `access_token=${token}`)
                                .send(reservation)
                                .end((err, res) => {
                                    expect(res.status).to.be.equal(201);                                
                                    expect(res.body).to.be.an('object');
                                    request.execute(app)
                                        .get(`/catways/${catwayId}/reservations`)
                                        .set('Cookie', `access_token=${token}`)
                                        .end((err, res) => {
                                            console.log("GET /catways response:", res.body);
                                            expect(res.status).to.equal(200);
                                            expect(res.body).to.be.an('array');
                                            expect(res.body.length).to.be.above(0);
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
        request.execute(app)
            .post("/auth/register")
            .send(user)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);   
                expect(res.body).to.be.a('object');
                request.execute(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {                        
                        expect(res.status).to.be.equal(200);
                        const userId = res.body._id;
                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                        let catway =
                        {
                            catwayNumber: 9,
                            type: "short",
                            catwayState: "Good condition",
                        };
                        request.execute(app)
                            .post('/catways/')
                            .set('Cookie', `access_token=${token}`)
                            .send(catway)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.an('object');
                                expect(res.body).to.have.property('catwayNumber');
                                expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                expect(res.body.type).to.be.equal(catway.type);
                                expect(res.body.catwayState).to.be.equal(catway.catwayState);
                                const catwayId = res.body._id;
                                let reservation =
                                {
                                    catway: catwayId,
                                    catwayNumber: 9,
                                    clientName: "Peterd",
                                    boatName: "Black Pearl",
                                    checkIn: "2024-01-18",
                                    checkOut: "2024-01-20",
                                };
                                request.execute(app)
                                .post(`/catways/${catwayId}/reservations`)
                                .set('Cookie', `access_token=${token}`)
                                .send(reservation)
                                .end((err, res) => {
                                    expect(res.status).to.be.equal(201);                                
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
                request.execute(app)
                    .post("/auth/register")
                    .send(user)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(201);   
                        expect(res.body).to.be.a('object');
                        request.execute(app)
                            .post("/auth/login")
                            .send(user)
                            .end((err, res) => {                        
                                expect(res.status).to.be.equal(200);
                                const userId = res.body._id;
                                const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                                let catway =
                                {
                                    catwayNumber: 8,
                                    type: "short",
                                    catwayState: "Good condition",
                                };
                                request.execute(app)
                                    .post('/catways/')
                                    .set('Cookie', `access_token=${token}`)
                                    .send(catway)
                                    .end((err, res) => {
                                        expect(res.status).to.be.equal(201);                                
                                        expect(res.body).to.be.an('object');
                                        expect(res.body).to.have.property('catwayNumber');
                                        expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                        expect(res.body.type).to.be.equal(catway.type);
                                        expect(res.body.catwayState).to.be.equal(catway.catwayState);
                                        const catwayId = res.body._id;
                                        let reservation =
                                        {
                                            catway: catwayId,
                                            catwayNumber: 8,
                                            clientName: "Peteri",
                                            boatName: "Black Pearl",
                                            checkIn: "2024-01-21",
                                            checkOut: "2024-01-24",
                                        };
                                        request.execute(app)
                                        .post(`/catways/${catwayId}/reservations/`)
                                        .set('Cookie', `access_token=${token}`)
                                        .send(reservation)
                                        .end((err, res) => {
                                            console.log("GET /catways response:", res.body);
                                            expect(res.status).to.be.equal(201);                                
                                            expect(res.body).to.be.an('object');
                                            expect(res.body).to.have.property('catwayNumber');
                                            const reservationId = res.body._id;
                                            request.execute(app)
                                                .get(`/catways/${catwayId}/reservations/${reservationId}`)
                                                .set('Cookie', `access_token=${token}`)
                                                .end((err, res) => {
                                                    console.log("GET /catways response:", res.body);
                                                    expect(res.status).to.be.equal(200);            
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
                        }
                        request.execute(app)
                            .post("/auth/register")
                            .send(user)
                            .end((err, res) => {
                                expect(res.status).to.be.equal(201);   
                                expect(res.body).to.be.a('object');
                                request.execute(app)
                                    .post("/auth/login")
                                    .send(user)
                                    .end((err, res) => {                        
                                        expect(res.status).to.be.equal(200);
                                        const userId = res.body._id;
                                        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
                                        let catway =
                                        {
                                            catwayNumber: 10,
                                            type: "short",
                                            catwayState: "Good condition",
                                        };
                                        request.execute(app)
                                            .post('/catways/')
                                            .set('Cookie', `access_token=${token}`)
                                            .send(catway)
                                            .end((err, res) => {
                                                expect(res.status).to.be.equal(201);                                
                                                expect(res.body).to.be.an('object');
                                                expect(res.body).to.have.property('catwayNumber');
                                                expect(res.body.catwayNumber).to.be.equal(catway.catwayNumber);
                                                expect(res.body.type).to.be.equal(catway.type);
                                                expect(res.body.catwayState).to.be.equal(catway.catwayState);
                                                const catwayId = res.body._id;
                                                let reservation =
                                                {
                                                    catway: catwayId,
                                                    catwayNumber: 10,
                                                    clientName: "Peterf",
                                                    boatName: "Black Pearl",
                                                    checkIn: "2024-01-21",
                                                    checkOut: "2024-01-24",
                                                };
                                                request.execute(app)
                                                .post(`/catways/${catwayId}/reservations/`)
                                                .set('Cookie', `access_token=${token}`)
                                                .send(reservation)
                                                .end((err, res) => {
                                                    console.log("GET /catways response:", res.body);
                                                    expect(res.status).to.be.equal(201);                                
                                                    expect(res.body).to.be.an('object');
                                                    expect(res.body).to.have.property('catwayNumber');
                                                    const reservationId = res.body._id;
                                                    request.execute(app)
                                                        .delete(`/catways/${catwayId}/reservations/${reservationId}`)
                                                        .set('Cookie', `access_token=${token}`)
                                                        .end((err, res) => {
                                                        expect(res.status).to.be.equal(200);                                               
                                                        done();
                                                        });        
                                                });
                                            }); 
                                    });
                                });  
                            });                                         
    });



