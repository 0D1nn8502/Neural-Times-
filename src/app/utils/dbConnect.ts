import mongoose from "mongoose";

const dbConnect = async() => {
    if (mongoose.connection.readyState === 1) {
        return {success: true, message: "Database already connected"};   
    };  

    try {
        await mongoose.connect(process.env.MONGODB_URI!);    
        return {success: true, message: "Database connected"}; 

    } catch (error) {
        console.error("Error connecting to database : ", error); 
        return {success: false, error: `Database connection failed : ${error}`};
    }
}

export default dbConnect; 