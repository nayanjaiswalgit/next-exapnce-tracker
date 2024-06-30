import mongoose from "mongoose";
export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("Connected to database")
        })
        connection.on("error",(error:any)=>{
            console.log("error from database", error)
            process.exit()
        })
    }
    catch(err){
        console.log(err)
    }
}