import { pool } from '../database/connection.js';


// const verCard = async () => {
//     const { rows} = await pool.query("SELECT * FROM posts"); //destructuring    
//     return rows;   //respuesta de la funcion
// };

const verCard = async (id) => {
    const text = "SELECT * FROM posts order by $1 asc";
    const { rows } = await pool.query(text, [id]); 
    return rows;   //respuesta de la funcion
};

const getCard = async (id) => {
    const text = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(text, [id]);
    if (rows.length === 0) {
      throw { code: "404" };
    }
    return rows[0];
};

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

const refreshCard = async (id, {titulo, img, descripcion, likes}) => {
    if (!titulo || !img || !descripcion) {
        throw { code: "400" };   //respuesta de la funcion
    }
    const text =
      "UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes =$4  WHERE id = $5 RETURNING *";
    const { rows } = await pool.query(text, [titulo, img, descripcion, likes, id]);
    return rows[0];
};

const refreshCardLike = async (id, {likes}) => {
    if (!likes) {
        throw { code: "400" };   //respuesta de la funcion
    }
    const text =
      "UPDATE posts SET likes = $1   WHERE id = $2 RETURNING *";
    //   "UPDATE posts SET likes = $1   order by id = $2 ASC  RETURNING *";
    const { rows } = await pool.query(text, [likes, id ]);
    return rows[0];
};

const removeCard = async (id) => {
    const text = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(text, [id]);
    return rows[0];
};


export const cardModel = {
    verCard,
    getCard,
    agregarCard,
    refreshCard,
    refreshCardLike,
    removeCard,
}