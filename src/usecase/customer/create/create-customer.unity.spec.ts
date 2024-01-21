import { CreateCustomerUseCase } from "./create-customer.use-case";

const input = {
    name: "John Doe",
    address: {
        street: "Street",
        number: 1,
        zip: "12345-678",
        city: "City",
    },
};

const MockCustomerRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test create customer use case", () => {
    it("should create customer", async () => {
        const customerRepository = MockCustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        });
    });

    it("should throw error when customer name is missing", async () => {
        const customerRepository = MockCustomerRepository();
        customerRepository.find.mockResolvedValue(true);
        const useCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrowError("Name is required");
    });

    it("should throw error when address street is missing", async () => {
        const customerRepository = MockCustomerRepository();
        customerRepository.find.mockResolvedValue(true);
        const useCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(useCase.execute(input)).rejects.toThrowError("Street is required");
    });

});
