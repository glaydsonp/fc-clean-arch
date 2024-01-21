import Product from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find-product.use-case";

const product = new Product("123", "Product Test", 10.0);

const MockProductRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test find product use case", () => {
    it("should return product", async () => {
        const productRepository = MockProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const outputExpected = {
            id: "123",
            name: "Product Test",
            price: 10.0,
        };

        const input = { id: "123" };
        const output = await useCase.execute(input);

        expect(output).toEqual(outputExpected);
    });

    it("should not return product", async () => {
        const productRepository = MockProductRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const useCase = new FindProductUseCase(productRepository);

        const input = { id: "1" };

        expect(useCase.execute(input)).rejects.toThrow("Product not found");
    });
});
