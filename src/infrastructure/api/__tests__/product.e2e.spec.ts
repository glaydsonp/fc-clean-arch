import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 10.0
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10.0);
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "John"
            });

        expect(response.status).toBe(400);
    });

    it("should list all products", async () => {
        const createResponse1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 10.0
            });

        expect(createResponse1.status).toBe(201);

        const createResponse2 = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                price: 20.0
            });

        expect(createResponse2.status).toBe(201);


        const listResponse = await request(app)
            .get("/products");

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.length).toBe(2);

        expect(listResponse.body[0].id).toBeDefined();
        expect(listResponse.body[0].name).toBe("Product 1");
        expect(listResponse.body[0].price).toBe(10.0);

        expect(listResponse.body[1].id).toBeDefined();
        expect(listResponse.body[1].name).toBe("Product 2");
        expect(listResponse.body[1].price).toBe(20.0);

    });
});