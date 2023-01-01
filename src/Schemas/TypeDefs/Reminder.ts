import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { UserType } from "./User";

export const ReminderType: any = new GraphQLObjectType({
  name: "Reminder",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    user: { type: UserType },
  }),
});
