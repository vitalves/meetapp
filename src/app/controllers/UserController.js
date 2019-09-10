import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  // CREATE
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      password: Yup.string()
        .required()
        .min(6)
        .max(30),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação do dados' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuario ja cadastrado' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  // UPDATE
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      passwordOld: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('passwordOld', (passwordOld, fild) =>
          passwordOld ? fild.required() : fild
        ),
      password_confirm: Yup.string().when('password', (password, fild) =>
        password ? fild.required().oneOf([Yup.ref('password')]) : fild
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Falha na validação dos dados enviados',
      });
    }

    const { email, passwordOld } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Email já em uso' });
      }
    }

    if (passwordOld && !(await user.checkPassword(passwordOld))) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
