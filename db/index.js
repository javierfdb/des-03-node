import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',  //servidor local de maquina
    user: 'postgres',
    password: 'bdjavier',  // el password de cada no
    database: 'likeme', // DB debe existir
    port: 5432,
    allowExitOnIdle: true  // cerrar sesion de conexion despues de cada consulta
})

// funcion ver todos los registros de la lista
const verCard = async () => {
    const { rows} = await pool.query("SELECT * FROM posts"); //destructuring    
    return rows;   //respuesta de la funcion
};

// funcion para insertar un card en la tabla en forma de parametros
const agregarCard = async ({titulo, img, descripcion, likes}) => {
    // validacion por si falta informacion principal del body
    if (!titulo || !img || !descripcion) {
        throw { code: "400" };   //respuesta de la funcion
    }
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *" // instruccion SQL
    const values = [titulo, img, descripcion, likes] // componentes de values que son los parametros de la funcion
    const result = await pool.query(consulta, values) // la consulta requiere 2 argumentos
    return result.rows[0]   //respuesta de la funcion
}

export {verCard, agregarCard}