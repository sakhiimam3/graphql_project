export const typeDefs =`
  type User {
    id:ID
    firstname:String
    lastname:String
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
    user(id:ID!):User
    iquote(by:ID!):[quotes]
    quotes:[quotes]
  
  }
  type Mutation {
    signUpDummy(firstname: String!, lastname:String!,email:String!,password:String!):User
  }

`;
