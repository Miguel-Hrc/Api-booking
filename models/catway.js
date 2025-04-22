import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'le numero est requis'],
        unique : true, 
    },
    type: {
        type: String,
        enum: ["long", "short"],
        required: [true]
    },
    catwayState: {
        type: String,
        required: [true, 'description de l etat est requis']
    },
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
},
{
    timestamps: true
});

export default mongoose.model("Catway", Catway);

Catway.clearIndexes();