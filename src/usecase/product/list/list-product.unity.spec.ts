import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list-product.use-case";

const product1 = new Product("1", "Product 1", 10.0);
const product2 = new Product("2", "Product 2", 20.0);

const MockProductRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unity test list products use case", () => {
    it("should return all products", async () => {
        const productRepository = MockProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = await useCase.execute();

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);

    });
});
