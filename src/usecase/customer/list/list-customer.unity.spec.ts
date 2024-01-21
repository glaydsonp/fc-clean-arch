import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list-customer.use-case";

const customer1 = new Customer("1", "John Doe 1");
const address1 = new Address("Street 1", 1, "12345-678", "City 1");
customer1.changeAddress(address1);

const customer2 = new Customer("2", "John Doe 2");
const address2 = new Address("Street 2", 2, "12345-678", "City 2");
customer2.changeAddress(address2);

const MockCustomerRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test list customers use case", () => {
    it("should return all customers", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new ListCustomerUseCase(customerRepository);

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
