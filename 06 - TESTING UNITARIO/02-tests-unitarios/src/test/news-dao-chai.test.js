//mocha + chai

import { expect } from "chai";
import mongoose from "mongoose";
import DaoMongo from "../persistence/DAOS/mongo/news.mongo.dao.js";

describe("tests unitarios de dao news", function () {
  this.timeout(5000);
  let newsDao;
  before(async () => {
    newsDao = new DaoMongo();
    DaoMongo.init();
    await mongoose.connection.collections["news"].drop();
    console.log("--se limpió la colección news--");
  });

  it("Debería retornar las noticias de la colección news", async () => {
    // await newsDao.deleteAll();
    const response = await newsDao.getAllNews();
    expect(Array.isArray(response)).to.be.equal(true);
    expect(response.length).to.be.equal(0);
  });

  it("Debería registrar una noticia", async () => {
    // await newsDao.deleteAll();
    const body = {
      title:
        "El enigmático edificio con faro que sorprende a metros del Congreso Nacional",
      body: `Se trata del Palacio Barolo, ubicado en Av. de Mayo 1370. 
            Tiene visitas guiadas temáticas para grupos de hasta 20 personas. El edificio está inspirado en la Divina Comedia. Las panorámicas son únicas.`,
      author: "Juan Perez",
      image: "https://www.cadena3.com/admin/playerswf/fotos/ARCHI_911553.jpg",
    };
    const response = await newsDao.createNew(body);
    const responseGetAll = await newsDao.getAllNews();
    expect(response).to.have.property("_id");
    expect(response.title).to.be.equal(body.title);
    expect(response.body).to.be.equal(body.body);
    expect(response.author).to.be.equal(body.author);
    expect(response.image).to.be.equal(body.image);
    expect(typeof body.title).to.be.equal("string");
    expect(body.image).to.be.a("string");
    expect(responseGetAll).to.have.length(1);
  });

  it("deberia encontrar una noticia por id", async () => {
    const body = {
      title:
        "El enigmático edificio con faro que sorprende a metros del Congreso Nacional2",
      body: `Se trata del Palacio Barolo, ubicado en Av. de Mayo 1370. 
              Tiene visitas guiadas temáticas para grupos de hasta 20 personas. El edificio está inspirado en la Divina Comedia. Las panorámicas son únicas.`,
      author: "Juan Perez",
      image: "https://www.cadena3.com/admin/playerswf/fotos/ARCHI_911553.jpg",
    };
    const response = await newsDao.createNew(body);
    const responseGetById = await newsDao.getNew(response._id);
    expect(responseGetById._id.toString()).to.equal(response._id.toString());
  });

  it("deberia actualizar una noticia", async () => {
    const body = {
      title:
        "El enigmático edificio con faro que sorprende a metros del Congreso Nacional3",
      body: `Se trata del Palacio Barolo, ubicado en Av. de Mayo 1370. 
              Tiene visitas guiadas temáticas para grupos de hasta 20 personas. El edificio está inspirado en la Divina Comedia. Las panorámicas son únicas.`,
      author: "Juan Perez",
      image: "https://www.cadena3.com/admin/playerswf/fotos/ARCHI_911553.jpg",
    };
    const body2 = {
      title: "title actualizado",
      body: "body actualizado",
      author: "Juan Perez",
      image: "https://www.cadena3.com/admin/playerswf/fotos/ARCHI_911553.jpg",
    };
    const response = await newsDao.createNew(body);
    const responseUpdate = await newsDao.updateNew(response._id, body2);
    expect(responseUpdate.title).to.be.equal(body2.title);
    expect(responseUpdate.body).to.be.equal(body2.body);
    expect(responseUpdate.image).to.be.equal(body2.image);
    expect(responseUpdate.author).to.be.equal(body2.author);
  });
});
