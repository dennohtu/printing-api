import {secrets} from "./config.config.js";
import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(secrets.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error on connectDB function in the config.db.js file : ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB

