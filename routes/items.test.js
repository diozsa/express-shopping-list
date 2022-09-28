process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

let items = require("../fakeDb");
let item = { name: "Stingray", price: 20000 };


beforeEach(() => {
    items.length = 0;
    items.push(item);
});

afterEach(() => {
    items = [];
});


describe("GET /items", () => {
    test("Gets all items", async () => {
        const res =  await request(app).get("/items");
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    })
})

describe("GET /items/:name", () => {
    test("Gets a single item", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });

    test("Responds with 404 if can't find item", async () => {
        const res = await request(app).get(`/items/{name}`);
        expect(res.statusCode).toBe(404);
    });
});


describe("POST /items", () => {
    test("Creates a new item", async () => {
        let res = await request(app).post("/items").send({
                name: "Paperplane",
                price: 0
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            added: {
                name: "Paperplane", price: 0
            }
        })
    });
});


describe("PATCH /items/:name", () => {
    test("Updates a single item", async () => {
        const res = await request(app)
            .patch(`/items/${item.name}`)
            .send({
                name: "Junk"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            updated: {
                name: "Junk"
            }
        });
    });

    test("Responds with 404 if can't find item", async () => {
        const res = await request(app).patch(`/items/0`);
        expect(res.statusCode).toBe(404);
    });
});


describe("DELETE /items/:name", () => {
    test("Deletes a single a item", async function () {
        const res = await request(app)
            .delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
});