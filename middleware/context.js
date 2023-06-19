import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken"

const context = (token)=>{
    if(token){
     const {userId} = jwt.verify(token,JWT_SECRET)
     return {userId}
    }
}

export default context