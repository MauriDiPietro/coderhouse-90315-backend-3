import { describe, test } from "node:test"; 
import assert from "node:assert";
import { fakerES as faker } from "@faker-js/faker";

const mockUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ max: 100 }),
    password: faker.string.hexadecimal(),
  };
};

const apiURL = "http://localhost:8080/api";

describe("TESTS API", () => {
  test("[POST] /register", async () => {});

  test("[POST] /login", async () => {});

  test("[GET] /current", async () => {});
});
