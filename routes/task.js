import  express from "express";
import { DeleteTasks, UpdateTasks, getMyTasks, newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


router.post("/new",isAuthenticated,newTask);

router.get("/my",isAuthenticated,getMyTasks);

router.route("/:id")
.put(isAuthenticated,UpdateTasks)
.delete(isAuthenticated,DeleteTasks)

export default router;