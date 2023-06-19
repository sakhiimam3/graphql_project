export const typeDefs = `
  type User {
    _id:ID
    firstName:String
    lastName:String
    email:String
    password:String
    quotes:[quotes]
  }
  
  type quotes{
        name :String
        by:ID
  }

  type Query {
    users: [User]
    user(_id:ID!):User
    iquote(by:ID!):[quotes]
    quotes:[quotes]
  
  }

   type Token{
       token :String
   }

  type Mutation {
    createUser(newUser: UserInput):User
    singInUser(login: userLoginIn):Token
    createQuote(name:String!):String
  }

  input UserInput {
    firstName:String! 
    lastName:String! 
    email:String!
    password:String!
  }
  input userLoginIn {
    email:String!
    password:String!
  }
`;
