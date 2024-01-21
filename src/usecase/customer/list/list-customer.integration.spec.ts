import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list-customer.use-case";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

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

    it("should return all customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

        const customer1 = CustomerFactory.createWithAddress("John Doe 1", new Address("Street 1", 1, "12345-678", "City 1"));
        const customer2 = CustomerFactory.createWithAddress("John Doe 2", new Address("Street 2", 2, "22345-678", "City 2"));

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const output = await useCase.execute();

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.city).toBe(customer1.Address.city);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[0].address.zip).toBe(customer1.Address.zip);
        expect(output.customers[0].address.number).toBe(customer1.Address.number);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.city).toBe(customer2.Address.city);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
        expect(output.customers[1].address.zip).toBe(customer2.Address.zip);
        expect(output.customers[1].address.number).toBe(customer2.Address.number);
    });
});
