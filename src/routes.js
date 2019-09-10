import { Router } from 'express';

// para o upload:
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

// middleware
import authMiddleware from './app/middlewares/auth';

// CONSTANTES:
const routes = new Router();
const upload = multer(multerConfig);

// ROTAS:
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// ROTAS AUTENTICADAS:
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
