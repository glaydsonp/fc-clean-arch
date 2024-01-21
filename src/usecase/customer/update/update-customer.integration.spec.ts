import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { UpdateCustomerUseCase } from "./update-customer.use-case";
import { InputUpdateCustomerDto } from "./update-customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

describe("Integration test update customer use case", () => {
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

    it("should update customer successfully", async () => {
        const customerRepository = new CustomerRepository();
        
        const customer = CustomerFactory.createWithAddress("John", new Address("Street", 1, "12345-678", "City"));
        await customerRepository.create(customer);
        
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const input: InputUpdateCustomerDto = {
            id: customer.id,
            name: "John Doe Updated",
            address: {
                street: "Street Updated",
                number: 1234,
                zip: "12345-678",
                city: "City Update",
            },
        };

        const outputExpected = {
            id: customer.id,
            name: "John Doe Updated",
            address: {
                street: "Street Updated",
                number: 1234,
                zip: "12345-678",
                city: "City Update",
            },
        };

        expect(await useCase.execute(input)).toEqual(outputExpected);
    });

    it("should throw error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        
        const customer = CustomerFactory.createWithAddress("John", new Address("Street", 1, "12345-678", "City"));
        
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const input: InputUpdateCustomerDto = {
            id: customer.id,
            name: "John Doe Updated",
            address: {
                street: "Street Updated",
                number: 1234,
                zip: "12345-678",
                city: "City Update",
            },
        };

        await expect(useCase.execute(input)).rejects.toThrowError("Customer not found");
    });
});
