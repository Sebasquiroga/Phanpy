import  JsonWebToken  from "jsonwebtoken"; {}

export function authMiddleware ( req,res, next) {
    try {
        const authHearder = req.headers.authorization;
        if (!authHearder) {
            return res.status (401).json({
                message: 'Token requerido'
            });
        }
        const [type, token] = authHearder.split(' ');
        if ( type !== 'Bearer' || !token) {
            return res.status (401).json({
                message: 'token no autorizado'
            });

        }

        const decoded = JsonWebToken.verify (
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next ();
    } catch (error) {
        return res.status(401).json({
            message: 'El token es invalido o expirado'
        });
    }
}