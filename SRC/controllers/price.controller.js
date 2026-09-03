import pool from '../config/database.js'

export async function getPrice(req, res) {
    try {
        const [results] = await pool.query(
            'SELECT * FROM PHANPY.Price_table'
        )
        res.status(200).json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al consultar los precios',
            error: error.message
        });
    }
}

export async function updatePrice (req, res) {
    const { price_high, price_low,id_price} = req.body;
   try{
        const [result] = await pool.query(
           'UPDATE PHANPY.Price_table SET price_high = ?, price_low = ? WHERE id_price = ?',
            [price_high, price_low, id_price]
        )
        res.status(200).json({
            message: 'Precio actualizado correctamente',
            result: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar el precio',
            error: error.message
        });
    }
}

