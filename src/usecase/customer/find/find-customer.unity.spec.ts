import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find-customer.use-case";

const customer = new Customer("1", "John Doe");
const address = new Address("Street", 1, "12345-678", "City");
customer.changeAddress(address);

const MockCustomerRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test find customer use case", () => {
    it("should return customer", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

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

    it("should not return customer", async () => {
        const customerRepository = MockCustomerRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = { id: "1" };

        expect(useCase.execute(input)).rejects.toThrow("Customer not found");
    });
});
