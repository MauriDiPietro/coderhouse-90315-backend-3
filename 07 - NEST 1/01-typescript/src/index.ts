const hola = (nombre: string):string => {
    return `Hola ${nombre} como estas?`;
}

console.log(hola('Alfredo'));

/* ------------------------------------ - ----------------------------------- */

let miPrimerVariable: string;
// let miPrimerVariable: string | number;
miPrimerVariable = 'Hola Mundo';
// miPrimerVariable = true

const hola2 = (nombre: string): void => {
    console.log(`Hola ${nombre} como estas?`);
}

interface Usuario  {
    first_name: string;
    last_name: string;
    age: number;
    is_active: boolean;
}

type UsuarioType = {
    first_name: string;
    last_name: string;
    age: number;
    is_active?: boolean;
}

const objeto: UsuarioType = {
    first_name: 'Alfredo',
    last_name: 'Gonzalez',
    age: 30,
}

