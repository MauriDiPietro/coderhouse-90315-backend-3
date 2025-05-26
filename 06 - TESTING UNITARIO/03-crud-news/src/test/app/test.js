//node testing
import app from '../../server.js';
import test, { before, describe } from 'node:test'
import assert from "node:assert";
import mongoose from "mongoose";
import { fakerES as faker } from "@faker-js/faker";

const mockNew = () => {
  return {
    title: faker.lorem.lines(1),
    body: faker.lorem.lines({ min: 1, max: 5 }),
    author: faker.person.fullName(),
    image: faker.image.url(),
  };
};

const API_URL = 'http://localhost:8080/news'

describe("Conjunto de pruebas API NEWS", () => {
  before(async () => {
    await mongoose.connection.collections["news"].drop();
  });

  test("[POST] /news", async () => {
    const body = mockNew();
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const responsePost = await response.json();
    const id = responsePost._id;
    const titleResponse = responsePost.title;
    const titleExpected = body.title;
    const bodyResponse = responsePost.body;
    const bodyExpected = body.body;
    const statusCode = response.status;
    assert.ok(responsePost, '_id')
    assert.equal(typeof id, 'string')
    assert.equal(titleResponse, titleExpected);
    assert.equal(bodyResponse, bodyExpected);
    assert.equal(statusCode, 200);
  });

  test("[GET] /news", async () => {
    const response = await fetch(API_URL);
    const responseGet = await response.json()
    const statusCode = response.status;
    assert.equal(statusCode, 200);
    assert.equal(Array.isArray(responseGet), true);
  });

//   test("[GET] /news/:id", async () => {
//     const body = mockNew();
//     const responsePost = await request(app).post("/news").send(body);
//     const id = responsePost.body._id;
//     expect(id).toBeDefined();
//     const responseGet = await request(app).get(`/news/${id}`);
//     const statusCode = responseGet.statusCode;
//     expect(statusCode).toBe(200);
//     const idFaker = "507f191e810c19729de860ea";
//     const getByIdFail = await request(app).get(`/news/${idFaker}`);
//     const responseGetFail = getByIdFail.body.msg;
//     const statusCodeFail = getByIdFail.statusCode;
//     const msgErrorApi = `No se encontró el id ${idFaker} en la base de datos.`;
//     expect(statusCodeFail).toBe(404);
//     expect(responseGetFail).toEqual(msgErrorApi);
//   });

//   test("[PUT] /news/:id", async () => {
//     const body = mockNew();
//     const responsePost = await request(app).post("/news").send(body);
//     const id = responsePost.body._id;
//     expect(id).toBeDefined();
//     const docUpd = {
//       title: faker.lorem.lines(1),
//       body: faker.lorem.lines({ min: 1, max: 5 }),
//       author: faker.person.fullName(),
//       image: faker.image.url(),
//     };

//     const responsePut = await request(app).put(`/news/${id}`).send(docUpd);
//     expect(responsePut.body._id).toBeDefined();
//     expect(responsePut.statusCode).toBe(200);
//     expect(responsePut.body.title).toEqual(docUpd.title);
//   });

//   test("[DELETE] /news/:id", async () => {
//     const body = mockNew();
//     const responsePost = await request(app).post("/news").send(body);
//     const id = responsePost.body._id;
//     expect(id).toBeDefined();
//     const responseDel = await request(app).delete(`/news/id/${id}`);
//     expect(responseDel.statusCode).toBe(200);
//     const responseGetById = await request(app).get(`/news/${id}`);
//     const responseGetFail = responseGetById.body.msg;
//     const statusCodeFail = responseGetById.statusCode;
//     const msgErrorApi = `No se encontró el id ${id} en la base de datos.`;
//     expect(statusCodeFail).toBe(404);
//     expect(responseGetFail).toEqual(msgErrorApi);
//   });
});
