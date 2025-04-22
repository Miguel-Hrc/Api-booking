import User from "../models/user.js";
import bcrypt from "bcryptjs";



export const getUserById = async (req, res, next) => {
    const id = req.params.id
    try {
        let user = await User.findById(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } 
    catch (error) {
        return res.status(501).json(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      let user = await User.findOne({ _id: id });
      if (!user) return res.status(404).json('user_not_found');
      const temp = {
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      };
      if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        temp.password = hash;
      }
      Object.keys(temp).forEach((key) => {
        if (temp[key] !== undefined && temp[key] !== "") {
          user[key] = temp[key];
        }
      });
      await user.save();
      return res.status(200).json(user);
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'server_error', message: error.message });
    }
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id
    try {
        await User.deleteOne({_id : id});
        return res.status(204).json('delete_ok');
    }
    catch (error) {
        return res.status(501).json(error);
    }
}

export const getUsers = async (req,res,next)=>{
    try {
      const users = await User.find();
      res.status(200).json(users);
    } 
    catch (err) {
      next(err);
    }
}