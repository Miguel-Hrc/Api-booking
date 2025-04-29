import mongoose from "mongoose";


const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type: Number,   
    },
    clientName: {
        type: String,
        required: [true, 'required name'],
        unique : true,
    },
    boatName: {
        type: String,
        required: [true, 'required boatName'],
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
