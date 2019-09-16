import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'createdAt', 'updatedAt', 'meetup_id', 'user_id'],
      include: [
        {
          model: Meetup,
          attributes: [
            'id',
            'file_id',
            'title',
            'description',
            'location',
            'date',
            'createdAt',
            'updatedAt',
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
          // inclue o usuario
          include: {
            model: User,
            attributes: ['id', 'name', 'email'],
          },
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Usuario logado nao encontrado. Faca login novamente' });
    }

    if (!meetup) {
      return res
        .status(400)
        .json({ error: 'O meetup buscado nao existe ou nao foi encontrado' });
    }

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'Nao e possivel subscrever-se em seu meetup' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Nao e possivel subscrever-se em meetup passado' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(400).json({
        error: 'Nao e possivel subcrever-se em dois meetups ao mesmo tempo',
      });
    }
    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(subscription);
  }
}
export default new SubscriptionController();
