import express from "express";
import { initClientDbConnection } from "./db/mongo.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import authRoute from "./routes/auth.mjs";
import usersRoute from "./routes/users.mjs";
import catwaysRoute from "./routes/catways.mjs";
import reservationsRoute from "./routes/reservations.mjs";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

initClientDbConnection();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API"     
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/", catwaysRoute);
app.use("/", reservationsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

export default app;