import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find-customer.use-case";

describe("Integration test find customer use case", () => {
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

    it("should return customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("1", "John Doe");
        const address = new Address("Street", 1, "12345-678", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const outputExpected = {
            id: "1",
            name: "John Doe",
            address: {
                street: "Street",
                number: 1,
                zip: "12345-678",
                city: "City",
            },
        };

        const input = { id: "1" };
        const output = await useCase.execute(input);

        expect(output).toEqual(outputExpected);
    });
});
