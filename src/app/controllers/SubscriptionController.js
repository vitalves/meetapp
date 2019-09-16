import Subscription from '../models/Subscription';
import User from '../models/User';
import Meetup from '../models/Meetup';

class SubscriptionController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });

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
        error: 'Nao e possivel subcrever-se a dois meetups no mesmo horario',
      });
    }
    /*
    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });
    */

    return res.json({ error: `${user.id} : ${meetup.id}` });
  }
}
export default new SubscriptionController();
