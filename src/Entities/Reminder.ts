import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
// entities
import { User } from "./User";

@Entity()
export class Reminder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  active!: boolean;

  @ManyToOne(() => User, (user) => user.reminders)
  user!: User;
}
