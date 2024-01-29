import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St.",
                    city: "Austin",
                    zip: "78704",
                    number: 123
                }
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address).toBeDefined();
        expect(response.body.address.street).toBe("123 Main St.");
        expect(response.body.address.city).toBe("Austin");
        expect(response.body.address.zip).toBe("78704");
        expect(response.body.address.number).toBe(123);
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John"
            });

        expect(response.status).toBe(400);
    });

    it("should list all customers", async () => {
        const createResponse1 = await request(app)
            .post("/customers")
            .send({
                name: "John Doe",
                address: {
                    street: "123 Main St.",
                    city: "Austin",
                    zip: "78704",
                    number: 123
                }
            });

        expect(createResponse1.status).toBe(201);

        const createResponse2 = await request(app)
            .post("/customers")
            .send({
                name: "Jane Doe",
                address: {
                    street: "321 St.",
                    city: "Houston",
                    zip: "66234",
                    number: 999
                }
            });

        expect(createResponse2.status).toBe(201);


        const listResponse = await request(app)
            .get("/customers");

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.length).toBe(2);

        expect(listResponse.body[0].id).toBeDefined();
        expect(listResponse.body[0].name).toBe("John Doe");
        expect(listResponse.body[0].address).toBeDefined();
        expect(listResponse.body[0].address.street).toBe("123 Main St.");
        expect(listResponse.body[0].address.city).toBe("Austin");
        expect(listResponse.body[0].address.zip).toBe("78704");
        expect(listResponse.body[0].address.number).toBe(123);

        expect(listResponse.body[1].id).toBeDefined();
        expect(listResponse.body[1].name).toBe("Jane Doe");
        expect(listResponse.body[1].address).toBeDefined();
        expect(listResponse.body[1].address.street).toBe("321 St.");
        expect(listResponse.body[1].address.city).toBe("Houston");
        expect(listResponse.body[1].address.zip).toBe("66234");
        expect(listResponse.body[1].address.number).toBe(999);

    });
});