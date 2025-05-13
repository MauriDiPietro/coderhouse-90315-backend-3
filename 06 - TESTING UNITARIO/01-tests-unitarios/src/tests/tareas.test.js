import { assert, expect } from "chai";
import { Tareas } from "../utils/tareas.js";

describe("conjunto de pruebas de clase tareas", () => {
  it("debería crear el contenedor de tareas vacio", () => {
    //etapa de preparacion
    const tareas = new Tareas();

    //etaoa de ejecucion
    const listadoTareas = tareas.list();

    //etapa de afirmaciones
    expect(listadoTareas).to.have.lengthOf(0);
    assert.lengthOf(listadoTareas, 0);
    assert.deepStrictEqual(listadoTareas.length, 0);
  });

  it("deberia crear tareas correctamente", () => {
    const tareas = new Tareas();
    tareas.add("salir a correr");
    const listadoTareas = tareas.list();
    assert.strictEqual(listadoTareas.length, 1);
    assert.deepStrictEqual(listadoTareas, [
      {
        title: "salir a correr",
        complete: false,
      },
    ]);
  });

  it("deberia marcar una tarea como complete", () => {
    const tareas = new Tareas();
    tareas.add("salir a correr");
    tareas.add("salir a caminar");
    tareas.complete("salir a correr");
    const listadoTareas = tareas.list();
    assert.deepStrictEqual(listadoTareas, [
      {
        title: "salir a correr",
        complete: true,
      },
      {
        title: "salir a caminar",
        complete: false,
      },
    ]);
  });

  it("comprobar error en completar tarea inexistente", () => {
    const tareas = new Tareas();
    const errorEsperado = "No hay tareas";
    const fnTest = () => {
      tareas.complete("tarea 1");
    };
    assert.throws(fnTest, Error, errorEsperado);
    expect(fnTest).to.throw(Error, errorEsperado);
  });
});
