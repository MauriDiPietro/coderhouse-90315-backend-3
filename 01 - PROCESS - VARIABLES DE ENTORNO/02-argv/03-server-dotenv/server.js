import express from 'express';
import './database.js';
import dotenv from 'dotenv';
import { initMongoDB } from './database.js';

const ENV = process.argv[2] || 'development';
dotenv.config({ path: ENV === 'staging' ? './.env.stg' : '.env.dev' }); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT

initMongoDB()
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT}`);
});



