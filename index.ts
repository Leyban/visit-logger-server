// express app
import express from 'express';
const app = express();
app.use(express.json());

// cors
import cors from 'cors';
app.use(cors());

// dotenv
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

// mongoose
import mongoose from 'mongoose';
import Log, { ILog } from './visitLog';
import toNewLog, { LogFields } from './utils/toNewLog';

console.log('connecting to ', MONGODB_URI);
if (!MONGODB_URI){
    console.log('MongoDB URI is missing');
} else {
    mongoose
        .connect(MONGODB_URI)
        .then(()=>{console.log('connected to MongoDB');})
        .catch((error: Error) => console.log('Unable to connect to MongoDB', error));
}

const PORT =  process.env.PORT || 3001;

app.get('/api/logs', async (_req, res) => {
    try {
        const logs: ILog[] = await Log.find(); 
        res.send(logs);
    } catch (error) {
        console.log('Unable to retrieve logs: '+ error);
    }
});

app.get('/api/:name', async (req, res) => {
    try {
        const logs: ILog[] = await Log.find({ name: req.params.name }); 
        res.send(logs);
    } catch (error) {
        console.log('Unable to retrieve logs: '+ error);
    }
});

app.post('/api/log', async (req, res) => {
    try {
        const log: ILog = toNewLog(req.body as LogFields);
        const newLog = new Log({
            name: log.name,
            site: log.site,
            time: log.time
        });
        await newLog.save();
        console.log(log.name, log.site, log.time);
        res.status(200);
    } catch (error) {
        console.log('Unable to save log ', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});