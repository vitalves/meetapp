import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// middleware
import authMiddleware from './app/middlewares/auth';

// CONSTANTES:
const routes = new Router();

// ROTAS:
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// ROTAS AUTENTICADAS:
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
