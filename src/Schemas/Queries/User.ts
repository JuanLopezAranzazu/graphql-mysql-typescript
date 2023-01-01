import { GraphQLList, GraphQLID } from "graphql";
import { UserType } from "./../TypeDefs/User";
// entities
import { User } from "./../../Entities/User";

export const FIND_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve() {
    const users = await User.find({});
    return users;
  },
};

export const FIND_BY_ID_USERS = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const user = await User.findOneBy({ id });
    return user;
  },
};
