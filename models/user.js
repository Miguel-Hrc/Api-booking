import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
      type : String,
      unique : true,
      required: [true, 'le nom est requis']
    },
    firstname: {
      type : String,
    },
    email: {
      type : String,
      required : [ true, 'l email est requis'],
      unique : true,
      lowercase: true
    },
    password : {
      type: String,
      required : [ true, 'le mot de passe est requis'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
},
{
  timestamps: true
});


export default mongoose.model("User", User);