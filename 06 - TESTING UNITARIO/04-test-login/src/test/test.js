import { describe, test } from "node:test";
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const mockUser = () => {
  return {
    first_name: faker.person.middleName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ max: 100 }),
    password: faker.string.hexadecimal(),
  };
};

const apiURL = "http://localhost:8080/api";

describe("TESTS API", () => {
  let userRegister = null;
  let cookieToken = null;

  test("[POST] /register", async () => {
    const body = mockUser();
    userRegister = {
      email: body.email,
      password: body.password,
    };

    const response = await fetch(`${apiURL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseAPI = await response.json();
    const firstNameResponse = responseAPI.data.first_name;
    const firstNameExp = body.first_name;
    const statusCode = response.status;
    assert.ok(responseAPI, "_id");
    assert.equal(firstNameResponse, firstNameExp);
    assert.equal(statusCode, 200);
    assert.rejects();
  });

  test("[POST] /login", async () => {
    const response = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegister),
      credentials: "include",
    });
    const responseAPI = await response.json();
    assert.equal(response.status, 200);
    const setCookieHeader = response.headers.get("set-cookie");
    assert.ok(setCookieHeader);
    assert.ok(setCookieHeader.includes("token="));
    /*
    token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJ1c2VySWQiOiI2ODJiZDNiNmY5Mzk2NTRhNTY3MGY0MWIiLCJmaXJzdF9uYW1lIjoiTWF1
    cmkiLCJsYXN0X25hbWUiOiJEaSBQaWV0cm8iLCJlbWFpbCI6ImRpcGlldHJvLmptQGdtYWlsLm
    NvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ3NzAyNzI1LCJleHAiOjE3NDc3MDMwMjV9.bNn8
    PPkDANNNZwVSqegQ7r-VT6VfjBa4CPFDxoVUa4I; Path=/; HttpOnly
    */
    cookieToken = setCookieHeader.split(";")[0];
  });

  test("[GET] /current", async () => {
    const response = await fetch(`${apiURL}/users/current`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookieToken },
      credentials: "include",
    });
    const responseAPI = await response.json();
    assert.equal(responseAPI.data.email, userRegister.email);
  });
});
