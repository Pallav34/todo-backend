import mongoose from "mongoose";


export const connecDB = () =>{
    mongoose.connect(process.env.MONGO_URL,{
    dbName:"backend",
})
.then((c)=> console.log(`Database connected with ${c.connection.host}`)).catch(e=>console.log(e))

}