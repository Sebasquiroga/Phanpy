import bcrypt from 'bcrypt';
import pool from '../config/database.js';   
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
    const { username, password, rol } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO PHANPY.users (username, password) VALUES (?, ?)',
            [username, hash]
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

export async function login(req, res) {
    try {
        const { username, password } = req.body;

        const [users] = await pool.query(
            'SELECT username, password, rol FROM PHANPY.users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Usuario no autorizado'
            });
        }

        const user = users[0];

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        const token = CreateToken(user);

        return res.status(200).json({
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor'
        });
    }
}

function CreateToken(user) {

    const token = jwt.sign(
        {
            username: user.username,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    return token;
}


