import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @CreateDateColumn({ name: "created_on" })
  created_on: Date;

  @UpdateDateColumn({ name: "updated_on" })
  updated_on: Date;

  @DeleteDateColumn({ name: "deleted_on" })
  deleted_on: Date;
}
