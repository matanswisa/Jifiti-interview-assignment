import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config'
import ApplicationsRouter from './routes/applications.js';

const app = express();
const { PORT } = process.env;

// Web Server configurations
app.use(bodyParser.urlencoded({}));
app.use(cors({
    origin: "*"
}));

// Using applications router api
app.use('/api', ApplicationsRouter)

app.listen(PORT, () => {
    console.log(`app is running on port.. ${PORT}`);
});