import { users ,quotes} from "../data.js";
import  {randomBytes}  from "crypto"
export  const resolvers = {
    Query: {
      users: () => users,
      user:(_,{id})=>users.find((users)=>users.id === id),
      quotes :()=>quotes,
      iquote:(_,{by})=>quotes.filter((quote)=>quote.by ===by),
    },
    User:{
         quotes :(user)=>quotes.filter((quote)=>quote.by === user.id)
    },
    
    Mutation:{
        signUpDummy:(_,{firstname,lastname,email,password})=>{
               const id=randomBytes(5).toString("hex")
               users.push({
                     id,
                    firstname,
                    lastname,
                    email,
                    password
               })
               return users.find(user => user.id === id)
        }
    }
  };


