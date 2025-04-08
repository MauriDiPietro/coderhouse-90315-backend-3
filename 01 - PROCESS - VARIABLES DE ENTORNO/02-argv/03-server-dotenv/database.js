import { connect } from 'mongoose';
// import 'dotenv/config';  --> toma el .env
import dotenv from 'dotenv';

const ENV = process.argv[2] || 'development';

dotenv.config({ path: ENV === 'staging' ? './.env.stg' : '.env.dev' }); 

export const initMongoDB = async () => {
    try {
        await connect(process.env.MONGO_URL)
    } catch (error) {
        throw new Error(error)
    }
}
