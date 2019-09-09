import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token não recebido',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id; // Veriavel de ID usada em toda os arquivos logados

    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Token inválido',
    });
  }
};
