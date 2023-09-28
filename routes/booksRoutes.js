import express from 'express';
import {  obtenerLibros, agregarLibro } from '../controllers/booksController.js';
const routes = express.Router();

//rutas publicas
routes.get('/', obtenerLibros);
routes.post('/', agregarLibro);



//rutas privadas
export default routes;