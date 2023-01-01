import { GraphQLString, GraphQLID } from "graphql";
import bcrypt from "bcrypt";
import { UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Message";
// entities
import { User } from "./../../Entities/User";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await User.insert({ name, username, password: passwordHash });
    return args;
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const user = await User.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }
    await User.delete(id);
    return { successful: true, message: "User deleted successfully" };
  },
};

export const UPDATE_PASSWORD_USER = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await User.findOneBy({ username });

    if (!user) {
      throw new Error("User not found");
    }
    const userPassword = user?.password;

    if (!bcrypt.compare(userPassword, oldPassword)) {
      throw new Error("Incorrect or missing password");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    await User.update({ username: username }, { password: passwordHash });
    return { successful: true, message: "User updated successfully" };
  },
};
