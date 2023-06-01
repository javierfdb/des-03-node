CREATE DATABASE likeme;

CREATE TABLE posts (
    id SERIAL, 
    titulo VARCHAR(25), 
    img VARCHAR(1000),
    descripcion VARCHAR(255), 
    likes INT
);


INSERT INTO posts (title, img, descripcion, likes) values ('nuevo', 'https://indiehoy.com/wp-content/uploads/2020/12/john-lennon.jpg', 'lorem ipsum', 100);

SELECT * FROM posts;