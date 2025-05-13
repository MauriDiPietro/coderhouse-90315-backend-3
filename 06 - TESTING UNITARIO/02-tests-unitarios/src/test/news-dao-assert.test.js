//mocha + assert(node)

import mongoose from "mongoose";
import assert from 'assert';
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
    assert.equal(Array.isArray(response), true);
    assert.equal(response.length, 0);
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
    assert.ok(response._id);
    assert.equal(response.title, body.title);
    assert.equal(response.body, body.body);
    assert.equal(response.author, body.author);
    assert.equal(response.image, body.image);
    assert.equal(typeof body.title, "string");
    assert.equal(typeof body.image, "string");
    assert.equal(responseGetAll.length, 1);
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
    assert.deepStrictEqual(responseGetById._id.toString(), response._id.toString());
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
    assert.equal(responseUpdate.title, body2.title);
    assert.equal(responseUpdate.body, body2.body);
    assert.equal(responseUpdate.image, body2.image);
    assert.equal(responseUpdate.author, body2.author);
  });
});
