import express from "express" // default export 
import {fetch, create, updateUser,deleteUser,fetchOne} from "../controller/userController.js" // named export 

const route = express.Router()


route.post("/create", create)
route.get("/getUsers", fetch)
route.get("/getOne/:id", fetchOne)
route.put("/update/:id", updateUser)
route.delete("/delete/:id", deleteUser)



export default route;