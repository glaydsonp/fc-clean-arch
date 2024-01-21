import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { CreateCustomerUseCase } from "./create-customer.use-case";
import { InputCreateCustomerDto } from "./create-customer.dto";

describe("Integration test create customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create customer successfully", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input: InputCreateCustomerDto = {
            name: "John Doe",
            address: {
                street: "Street",
                number: 1,
                zip: "12345-678",
                city: "City",
            },
        };

        const outputExpected = {
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "Street",
                number: 1,
                zip: "12345-678",
                city: "City",
            },
        };

        expect(await useCase.execute(input)).toEqual(outputExpected);
    });
});
