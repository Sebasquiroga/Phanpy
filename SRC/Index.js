import express from "express";
import pool from './config/database.js'/*importamos la conexion a la base de datos para arrancar*/
import priceRouter from './routes/price.router.js'/*importamos el router de precios para poder usarlo en el servidor*/
import userRouter from './routes/users.router.js'/*importamos el router de usuarios para poder usarlo en el servidor*/
import feeRouter from './routes/fee.router.js'/*importamos el router de tarifas para poder usarlo en el servidor*/

/*Aqui debajo van a estar las constantes*/
const app = express();
const port = process.env.PORT || 3000;

/*aqui debajo van a estar las funciones de servidor*/
app.listen(port,() => {
    console.log("Servidor corriendo en el puerto: " + port);
})/*esta funcion es para que el servidor se mantenga corriendo en el puerto que le asignemos y escuche las peticiones*/
app.use(express.json());/*Esto es para que el servidor pueda recibir datos en formato JSON*/

app.use('/api', priceRouter);
app.use('/api', userRouter);/*Esto es para que el servidor pueda recibir peticiones en la ruta /api y las envie al router de usuarios*/
app.use('/api', feeRouter);/*Esto es para que el servidor pueda recibir peticiones en la ruta /api y las envie al router de tarifas*/