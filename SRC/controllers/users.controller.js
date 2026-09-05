export async function createUser(req, res) {
    const { username, password, rol } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO PHANPY.users (username, password, rol) VALUES (?, ?, ?)',
            [username, hash, rol]
        );

        res.status(201).json({
            message: 'Usuario creado correctamente',
            result: result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
}