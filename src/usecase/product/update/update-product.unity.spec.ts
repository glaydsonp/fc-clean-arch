import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update-product.use-case";

const product = new Product('123', 'Product A', 10.0);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 15.0
};

const MockProductpository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test update product use case", () => {
    it("should update product", async () => {
        const productRepository = MockProductpository();
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw error when product is not found", async () => {
        const productRepository = MockProductpository();
        productRepository.find.mockResolvedValue(false);
        const useCase = new UpdateProductUseCase(productRepository);

        await expect(useCase.execute(input)).rejects.toThrowError("Product not found");
    });

    it("should throw error when product price is lower than zero", async () => {
        const productRepository = MockProductpository();
        const useCase = new UpdateProductUseCase(productRepository);

        await expect(useCase.execute({ ...input, price: -15.0 })).rejects.toThrowError("Price must be greater than zero");
    });

    it("should throw error when product name is missing", async () => {
        const productRepository = MockProductpository();
        const useCase = new UpdateProductUseCase(productRepository);

        await expect(useCase.execute({ ...input, name: "" })).rejects.toThrowError("Name is required");
    });
});
