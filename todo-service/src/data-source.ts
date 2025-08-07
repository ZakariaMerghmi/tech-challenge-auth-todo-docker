import "reflect-metadata";
import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres-todo",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "todos_db",
  synchronize: true,
  logging: false,
  entities: [Todo],
  migrations: [],
  subscribers: [],
});
