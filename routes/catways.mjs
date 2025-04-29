import { verifyUser } from "../middlewares/private.mjs";
import  {createCatway, updateCatway, deleteCatway, getCatwayById, getAllCatways  } from "../controllers/catwayController.mjs";
import express from "express";

var router = express.Router();

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     description: Get secific catway
 *     tags:
 *      - Catway
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
  router.get('/catways/:id', verifyUser , getCatwayById);

/**
 * @swagger
 * /catways/:
 *   post:
 *     description: Post catway by ID
 *     tags:
 *       - Catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: 
 *                   - long
 *                   - short
 *               catwayNumber:
 *                 type: number
 *     responses:
 *       200:
 *         description: Catway created successfully
 */
  router.post('/catways/', verifyUser , createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   patch:
 *     description: Update catway by ID
 *     tags:
 *       - Catway
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
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway updated successfully
 */  
  router.patch('/catways/:id', verifyUser , updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     description: Delete secific catway
 *     tags:
 *      - Catway
 *     parameters:
 *      - name: id
 *        description: id of the catway
 *        in: path
 *        required: true
 *        type: string
 *      
 *     responses:
 *       201:
 *         description: Catway deleted successfully
 */
  router.delete('/catways/:id', verifyUser , deleteCatway);

/**
 * @swagger
 * /catways/:
 *   get:
 *     description: Get all catways
 *     tags:
 *      - Catway
 *     responses:
 *       200:
 *         description: Success
 * 
 */
  router.get('/catways/', verifyUser, getAllCatways);

export default router;