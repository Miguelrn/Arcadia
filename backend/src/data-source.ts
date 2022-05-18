import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "arcadia_db",
    port: Number.parseInt(process.env.DB_PORT||'5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    synchronize: true,
    logging: false,
    entities: [
        User
    ],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
