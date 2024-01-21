import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update-product.use-case";

describe("Integration test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update product successfully", async () => {
        const productRepository = new ProductRepository();

        const product = new Product('123', 'Product A', 10.0);
        await productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 15.0
        };

        const outputExpected = {
            id: product.id,
            name: "Product Updated",
            price: 15.0
        };

        expect(await useCase.execute(input)).toEqual(outputExpected);
    });

    it("should throw error when product is not found", async () => {
        const productRepository = new ProductRepository();

        const input = {
            id: '123',
            name: "Product Updated",
            price: 15.0
        };

        const useCase = new UpdateProductUseCase(productRepository);

        await expect(useCase.execute(input)).rejects.toThrowError("Product not found");
    });

    it("should throw error when product name is missing", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = new Product('123', 'Product A', 10.0);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 15.0
        };

        await expect(useCase.execute({ ...input, name: "" })).rejects.toThrowError("Name is required");
    });

    it("should throw error when product price is lower than zero", async () => {
        const productRepository = new ProductRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const product = new Product('123', 'Product A', 10.0);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: 15.0
        };

        await expect(useCase.execute({ ...input, price: -15.0 })).rejects.toThrowError("Price must be greater than zero");
    });
});
