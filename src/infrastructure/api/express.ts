import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { customerRoutes } from "./routes/customer.route";
import CustomerModel from "../customer/repository/sequelize/customer.model";

export const app: Express = express();
app.use(express.json());
app.use("/customers", customerRoutes)

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    await sequelize.addModels([CustomerModel]);

    await sequelize.sync();
}

setupDb();