import app from "app";
import supertest from "supertest";


describe("POST /fruits", () => {
  it("inserting a fruit should return 201", async () => {
    const body = {
      name: "mamão",
      price: 6.90
    }
    const result = await supertest(app).post("/fruits").send(body);
    expect(result.status).toEqual(201);
  });
  it("inserting fruit that already exists returns 409", async () => {
    const body = {
      name: "mamão",
      price: 6.90
    }
    const check = await supertest(app).post("/fruits").send(body);
    expect(check.status).toEqual(409);
  });
  it("inserting a fruit with data missing should return 422", async () => {
    const body = {
      name: "cajá"
    }
    const missing = await supertest(app).post("/fruits").send(body);
    expect(missing.status).toEqual(422);
  });
});

describe("GET /fruits", () => {
  it("if fruit does not exist returns 404", async () => {
    const result = await supertest(app).get("/fruits/5");
    expect(result.status).toEqual(404);
  });
  it("if id param is not valid returns 400", async () => {
    const result = await supertest(app).get("/fruits/hi");
    expect(result.status).toEqual(400);
  });
  it("returns a fruit given id", async () => {
    const result = await supertest(app).get("/fruits/1");
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number)
      })
    )
  });
  it("returns all fruits",async () => {
    const result = await supertest(app).get("/fruits");
    expect(result.status).toEqual(200);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number)
        })
      ])
    )
  })
})
