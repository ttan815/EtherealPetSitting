import mongoose from "mongoose";

const connectDB = connect

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connect!");
    } catch (error) {
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB