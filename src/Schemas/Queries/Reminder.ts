import { GraphQLList, GraphQLID } from "graphql";
import { ReminderType } from "./../TypeDefs/Reminder";
// entities
import { Reminder } from "./../../Entities/Reminder";

export const FIND_ALL_REMINDERS = {
  type: new GraphQLList(ReminderType),
  async resolve() {
    const reminders = await Reminder.find({
      relations: {
        user: true,
      },
    });
    return reminders;
  },
};

export const FIND_BY_ID_REMINDER = {
  type: ReminderType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const reminder = await Reminder.findOneBy({ id });
    if (!reminder) {
      throw new Error("Reminder not found");
    }
    return reminder;
  },
};
