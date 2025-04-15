import { calculadora } from "../calculadora.js";

describe('conjunto de pruebas suma', () => {
    it('deberia sumar dos numeros', ()=>{
        //preparacion
        const num1 = 4;
        const num2 = 8;
        const resultadoEsperado = 12;

        //ejecucion
        const resultado = calculadora.suma(num1, num2);

        //verificacion
        expect(resultado).toBe(resultadoEsperado)
        expect(resultado).not.toBe(0)
        expect(resultado).toBeDefined()
        //toBeGreaterThan(11)
    });

    it('si uno de los argumentos no es numero, deberia retornar un error', ()=>{
        const arg1 = 4;
        const arg2 = ['hola'];

        expect(()=>calculadora.suma(arg1, arg2)).toThrow()
        expect(()=>calculadora.suma(arg1, arg2)).toThrow('Argumentos invalidos')
    })
})