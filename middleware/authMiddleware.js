import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.js';

const checkAuth = async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Si el token es válido, puedes almacenar la información del usuario en req para su uso posterior
            req.user = await Usuario.findById(decoded.id).select("-password"); //va a crear una sesion con los datos del usuario


            // Continuar con la ejecución normal del middleware
            return next();
        } catch (error) {
            const err = new Error('Token no valido.')
            return res.status(403).json({ msg: err.message });
        }
    }  if (!token) {
        const error = new Error('Token invalido o inexistente.')
        res.status(403).json({ msg: error.message });
    }
    next();
};

export default checkAuth;
