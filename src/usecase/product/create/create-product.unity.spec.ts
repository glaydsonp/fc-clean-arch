import { CreateProductUseCase } from "./create-product.use-case";

const input = {
    name: "Testing Product",
    price: 10.0,
};

const MockProductRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test create product use case", () => {
    it("should create product", async () => {
        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw error when product name is missing", async () => {
        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await expect(useCase.execute({ ...input, name: "" })).rejects.toThrowError("Name is required");
    });

    it("should throw error when price is lower than zero", async () => {
        const productRepository = MockProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await expect(useCase.execute({ ...input, price: -10.0 })).rejects.toThrowError("Price must be greater than zero");
    });

});
