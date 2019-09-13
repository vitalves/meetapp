import { Router } from 'express';

// para o upload:
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

// middlewares
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
routes.post('/meetups', MeetupController.store);
routes.get('/meetups', MeetupController.index);

// arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
