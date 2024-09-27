import response from "supertest";
import server, { connectDB } from "../../server";

describe("POST /api/products", () => {
  it("Should display validation error", async () => {
    const res = await response(server).post("/api/products").send({});
    expect(res.status).toBe(400);

    expect(res.status).not.toBe(500);
  });

  it("Should validate that the price is greater than 0", async () => {
    const res = await response(server).post("/api/products").send({
      name: "product test",
      price: 0,
    });
    expect(res.status).toBe(400);

    expect(res.status).not.toBe(201);
  });

  it("Should validate that the price is a string and greater than 0", async () => {
    const res = await response(server).post("/api/products").send({
      name: "product test",
      price: "hola",
    });
    expect(res.status).toBe(400);

    expect(res.status).not.toBe(201);
  });

  it("Should create a product", async () => {
    const res = await response(server).post("/api/products").send({
      name: "product test",
      price: 100,
    });

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(500);
  });
});

describe("GET /api/products", () => {
  it("Should check if api/products url exists", async () => {
    const res = await response(server).get("/api/products");
    expect(res.status).toBe(200);

    expect(res.status).not.toBe(404);
  });

  it("Get a jSON response with products", async () => {
    const res = await response(server).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(201);
  });
});

describe("GET /api/products/:id", () => {
  it("Should return a 404 status if the product does not exist", async () => {
    const res = await response(server).get("/api/products/1000");
    expect(res.status).toBe(404);

    expect(res.status).not.toBe(200);
  });

  it("Should return a 200 status if the product exists", async () => {
    const res = await response(server).get("/api/products/1");
    expect(res.status).toBe(200);

    expect(res.status).not.toBe(404);
  });
});

describe("PUT /api/products/:id", () => {
  it("Should return a 404 status if the product does not exist", async () => {
    const res = await response(server).put("/api/products/1000").send({
      name: "product test",
      price: 100,
    });
    expect(res.status).toBe(404);

    expect(res.status).not.toBe(200);
  });

  it("Should return a 200 status if the product exists", async () => {
    const res = await response(server).put("/api/products/1").send({
      name: "product test",
      price: 100,
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(404);
  });

  it("Should validate that the price is greater than 0", async () => {
    const res = await response(server).put("/api/products/1").send({
      name: "product test",
      price: 0,
    });
    expect(res.status).toBe(400);

    expect(res.status).not.toBe(200);
  });

  it("Should update a valid product with valid data", async () => {
    const res = await response(server).put("/api/products/1").send({
      name: "product test",
      price: 100,
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(500);
  });
});

describe("PATCH /api/products/:id", () => {
  it("Should return a 404 status if the product does not exist", async () => {
    const res = await response(server).patch("/api/products/1000").send({
      name: "product test",
      price: 100,
    });
    expect(res.status).toBe(404);

    expect(res.status).not.toBe(200);
  });

  it("Should return a 200 status if the product exists", async () => {
    const res = await response(server).patch("/api/products/1").send({
      name: "product test",
      price: 100,
    });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(404);
  });
});

describe("DELETE /api/products/:id", () => {
  it("Should check is a valid url", async () => {
    const res = await response(server).delete("/api/products/eso-tilin");
    expect(res.status).toBe(400);

    expect(res.status).not.toBe(200);
  });

  it("Should return a 404 status if the product does not exist", async () => {
    const res = await response(server).delete("/api/products/1000");
    expect(res.status).toBe(404);

    expect(res.status).not.toBe(200);
  });

  it("Should delete a valid product", async () => {
    const res = await response(server).delete("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);

    expect(res.status).not.toBe(500);
  });
});
