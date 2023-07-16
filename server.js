import { app } from "./app.js";
import { connecDB } from "./Data/database.js";

connecDB();

app.listen(process.env.PORT, ()=> {console.log(`Server ${process.env.PORT} in ${process.env.NODE_ENV} mode`) })