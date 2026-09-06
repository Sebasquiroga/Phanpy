import pool from '../config/database.js';
import {getPriceByPax} from './price.controller.js';

export async function getSeasonByDate(dateStart, dateEnd) {
    const [rows] = await pool.query(
        `
        SELECT 
            date,
            high_season
        FROM Date_Season
        WHERE date BETWEEN ? AND ?
        ORDER BY date ASC
        `,
        [dateStart, dateEnd]
    );

    return rows;
}; /* Esta función obtiene las fechas y la información de temporada alta/baja entre dos fechas dadas. Devuelve un array de objetos con la fecha y si es temporada alta o baja. */


export async function getFeeByDate(req, res) {
    const { dateStart, dateEnd, pax, roomType } = req.body;

    let seasonData = await getSeasonByDate(dateStart, dateEnd);
    let priceData = await getPriceByPax(roomType,pax); //El orden de los parámetros es importante, primero roomType y luego pax, ya que la función getPriceByPax está definida así en price.controller.js

    console.log('Season Data:', seasonData);
    console.log('Price Data:', priceData);
}