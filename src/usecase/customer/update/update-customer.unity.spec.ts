import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update-customer.use-case";

const customer = CustomerFactory.createWithAddress("John", new Address("Street", 1, "12345-678", "City"));

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "12345-678",
        city: "City Updated",
    },
};

const MockCustomerRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test update customer use case", () => {
    it("should update customer", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw error when customer is not found", async () => {
        const customerRepository = MockCustomerRepository();
        customerRepository.find.mockResolvedValue(false);
        const useCase = new UpdateCustomerUseCase(customerRepository);

        await expect(useCase.execute(input)).rejects.toThrowError("Customer not found");
    });

    it("should throw error when address street is missing", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        await expect(useCase.execute(
            {
                id: customer.id,
                name: "John Updated",
                address: {
                    street: "",
                    number: 1234,
                    zip: "12345-678",
                    city: "City Updated",
                },
            }
        )).rejects.toThrowError("Street is required");
    });

    
    it("should throw error when customer name is missing", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        await expect(useCase.execute({
            id: customer.id,
            name: "",
            address: {
                street: "Street Updated",
                number: 1234,
                zip: "12345-678",
                city: "City Updated",
            },
        })).rejects.toThrowError("Customer: Name is required");
    });

});
