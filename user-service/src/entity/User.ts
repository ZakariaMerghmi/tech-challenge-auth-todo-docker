import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
