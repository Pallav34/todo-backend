import mongoose from "mongoose";


export const connecDB = () =>{
    mongoose.connect(process.env.MONGO_URL,{
    dbName:"backend",
})
.then(()=> console.log("Database connected")).catch(e=>console.log(e))

}