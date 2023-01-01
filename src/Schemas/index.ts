import { GraphQLSchema, GraphQLObjectType } from "graphql";
// queries
import { FIND_ALL_USERS, FIND_BY_ID_USERS } from "./Queries/User";
// mutations
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_PASSWORD_USER,
} from "./Mutations/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    findAllUsers: FIND_ALL_USERS,
    findByIDUser: FIND_BY_ID_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePasswordUser: UPDATE_PASSWORD_USER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
