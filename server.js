import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import routes from './routes';

const app = express();

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection successfully.."))
    .catch((err) => console.log(err))

app.use(express.json());

app.use(routes) //My Application routes Register 

app.listen(5050, () => console.log(`run port ${APP_PORT}`))