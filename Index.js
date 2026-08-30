import express from "express";

/* Aqui debajo van a estar las constantes */
const app = express();
const port = process.env.PORT || 3000;


/* aqui debajo van a estar las funciones de servidor*/
app.listen(port,() => {
    console.log("Servidor corriendo en el puerto: " + port);
})