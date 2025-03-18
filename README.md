El back end se encuentra configurado con Node.js: se debe ejecutar npm i para la instalación de los paquetes. Su ejecución se puede realizar con node app.js.

Se debe crear una base de datos mediante MySQL: se debe crear una base de datos que se llame "infosave" y la tabla se genera con la siguiente query:

sql
Copiar
Editar
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL
);

El front end se encuentra configurado con Angular: se debe ejecutar npm i para la instalación de los paquetes. Para su ejecución, se puede realizar con npm run start.
