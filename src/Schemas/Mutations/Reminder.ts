import { GraphQLString, GraphQLID, GraphQLBoolean } from "graphql";
import { ReminderType } from "../TypeDefs/Reminder";
import { MessageType } from "../TypeDefs/Message";
// entities
import { Reminder } from "./../../Entities/Reminder";
import { User } from "./../../Entities/User";

export const CREATE_REMINDER = {
  type: ReminderType,
  args: {
    content: { type: GraphQLString },
    user_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { content, user_id } = args;
    const user = await User.findOneBy({ id: user_id });
    if (!user) {
      throw new Error("User not found");
    }
    const newReminder = new Reminder();
    newReminder.content = content;
    newReminder.active = true;
    newReminder.user = user;
    await newReminder.save();
    return args;
  },
};

export const DELETE_REMINDER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const reminder = await Reminder.findOneBy({ id });
    if (!reminder) {
      throw new Error("Reminder not found");
    }
    await Reminder.delete(id);
    return { successful: true, message: "Reminder deleted successfully" };
  },
};

export const UPDATE_ACTIVE_REMINDER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    active: { type: GraphQLBoolean },
  },
  async resolve(parent: any, args: any) {
    const { id, active } = args;
    const reminder = await Reminder.findOneBy({ id });
    if (!reminder) {
      throw new Error("Reminder not found");
    }
    reminder.active = active;
    await reminder.save();
    return { successful: true, message: "Reminder updated successfully" };
  },
};
