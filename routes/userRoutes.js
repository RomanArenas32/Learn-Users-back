import express from 'express';
import {  actualizarUsuario, autenticarUsuario, registrarUsuario, perfil } from '../controllers/userControllers.js';
const routes = express.Router();
import checkAuth from '../middleware/authMiddleware.js';

//rutas publicas
routes.post('/registrarse', registrarUsuario);
routes.post('/login', autenticarUsuario);
routes.put('/:id', actualizarUsuario);



//rutas privadas
routes.get('/perfil', checkAuth, perfil);


export default routes;