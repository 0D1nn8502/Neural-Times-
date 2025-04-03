import mongoose from "mongoose";

const dbConnect = async() => {
    if (mongoose.connection.readyState >= 1) return; 

    return mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://adityarajsingh8502:Jagmag852002@cluster0.kktrz.mongodb.net/neural_times");       
}

export default dbConnect; 