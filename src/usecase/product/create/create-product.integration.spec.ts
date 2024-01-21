import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create-product.use-case";
import { InputCreateProductDto } from "./create-product.dto";

describe("Integration test create product use case", () => {
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

    it("should create product successfully", async () => {
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input: InputCreateProductDto = {
            name: "Testing Product",
            price: 10.00,
        };

        const outputExpected = {
            id: expect.any(String),
            name: "Testing Product",
            price: 10.00,
        };

        expect(await useCase.execute(input)).toEqual(outputExpected);
    });
});
