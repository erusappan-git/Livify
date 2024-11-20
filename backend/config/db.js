import mongoose from "mongoose";

const connectDB = async () => {

    try {
        const connect = await mongoose.connect("mongodb+srv://aegonwesteros:4460@dev-cluster.4j5zj.mongodb.net/livify");
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error Message : ${error}`);
        process.exit(1); 
    }

}

export default connectDB;