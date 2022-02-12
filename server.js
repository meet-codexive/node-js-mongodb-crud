import express from 'express'
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middelware/errorHandler';
import routes from './routes';
import mongoose from 'mongoose';
import path from 'path';
const app = express();

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection successfully.."))
    .catch((err) => console.log(err))

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes)
app.use('/uploads', express.static('uploads'))

app.use(errorHandler)
app.listen(8081, () => console.log(`run port 🏡🚀 ${APP_PORT} 🚀🏡`))
