import mongoose from "mongoose";


const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type: String,   
    },
    clientName: {
        type: String,
        required: [true, 'le nom est requis'],
        unique : true,
    },
    boatName: {
        type: String,
        required: [true, 'le nom du bateau est requis'],
        unique : true,
    },
    checkIn: { 
        type: Date, 
        required: true 
    },
    checkOut: { 
        type: Date, 
        required: true 
    },
},
{
    timestamps: true
});


export default mongoose.model("Reservation", Reservation);


Reservation.clearIndexes();
