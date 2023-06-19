import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import userSchema from "../model/user.js";


const UserSchme = mongoose.model("User");
const Quote = mongoose.model("Quote");

export const resolvers = {
  Query: {
    users:async () => await UserSchme.find({}),
    user:async (_, { _id }) => await UserSchme.findOne({_id}),
    quotes: async() => await Quote.find({}),
    iquote:async (_, { by }) => await Quote.find({by})
  },
  User: {
    quotes: async (ur) => await Quote.find({by:ur._id.toString()})
  },

  Mutation: {
    createUser: async (_, { newUser }) => {
      const isValidUser = await UserSchme.findOne({ email: newUser.email }); 
      if (isValidUser) {
        throw new Error("User already exists with that email");
      }

      const hashedPassword = await bcrypt.hash(newUser.password, 12);

      const saveUser = new UserSchme({
        ...newUser,
        password: hashedPassword,
      });

      return await saveUser.save();
    },
    singInUser: async (_, {login}) => {
      const user = await UserSchme.findOne({email:login.email})
      if(!user){
          throw new Error("User dosent exists with that email")
      }
      const doMatch =await bcrypt.compare(login.password,user.password)
      if(!doMatch){
          throw new Error("email or password in invalid")
      }
      const token = jwt.sign({userId:user._id},JWT_SECRET)
      return {token}
    },

    createQuote:async(_,{name},{token:{userId}})=>{
      if(!userId) throw new Error("You must be logged in")
      const newQuote = new Quote({
          name,
          by:userId
      })
      await newQuote.save()
      return "Quote saved successfully"
   } 
    
  },
};
