import { GraphQLSchema, GraphQLObjectType } from "graphql";
// queries
import { FIND_ALL_USERS, FIND_BY_ID_USERS } from "./Queries/User";
import { FIND_ALL_REMINDERS, FIND_BY_ID_REMINDER } from "./Queries/Reminder";
// mutations
import {
  CREATE_USER,
  DELETE_USER,
  UPDATE_PASSWORD_USER,
} from "./Mutations/User";
import {
  CREATE_REMINDER,
  DELETE_REMINDER,
  UPDATE_ACTIVE_REMINDER,
} from "./Mutations/Reminder";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    findAllUsers: FIND_ALL_USERS,
    findByIDUser: FIND_BY_ID_USERS,
    findAllReminders: FIND_ALL_REMINDERS,
    findByIdReminder: FIND_BY_ID_REMINDER,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePasswordUser: UPDATE_PASSWORD_USER,
    createReminder: CREATE_REMINDER,
    deleteReminder: DELETE_REMINDER,
    updateActiveReminder: UPDATE_ACTIVE_REMINDER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
