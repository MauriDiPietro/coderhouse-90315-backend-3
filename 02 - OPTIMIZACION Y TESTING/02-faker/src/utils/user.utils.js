import { fakerES as faker } from "@faker-js/faker";

export const generateUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    image: faker.image.imageUrl(),
  };
};

console.log(generateUser())