import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
      type : String,
      unique : true,
      required: [true, 'required name']
    },
    firstname: {
      type : String,
    },
    email: {
      type : String,
      required : [ true, 'required email'],
      unique : true,
      lowercase: true
    },
    password : {
      type: String,
      required : [ true, 'required password'],
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