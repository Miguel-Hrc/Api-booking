import { verifyUser, verifyAdmin } from "../middlewares/private.mjs";
import  { getUserById, updateUser, deleteUser, getAllUsers } from "../controllers/userController.mjs";
import express from "express";

var router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get secific user
 *     tags:
 *      - Users
 *     parameters:
 *      - name: id
 *        description: id of the user
 *        in: path
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Success
 */
  router.get('/:id', verifyUser, getUserById);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     description: Update user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
  router.patch('/:id', verifyUser, updateUser);
  
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete secific user
 *     tags:
 *      - Users
 *     parameters:
 *      - name: id
 *        description: id of the user
 *        in: path
 *        required: true
 *        type: string
 *      
 *     responses:
 *       201:
 *         description: User updated successfully
 */
  router.delete('/:id', verifyUser, deleteUser);

/**
 * @swagger
 * /users/:
 *   get:
 *     description: Get all users
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: Success
 */
  router.get('/', verifyAdmin, getAllUsers);

export default router;
