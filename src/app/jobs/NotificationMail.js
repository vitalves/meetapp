import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class NotificationMail {
  get key() {
    return 'NotificationMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `Nova inscrição ao ser Meetup: ${meetup.title}`,
      template: 'notification',
      context: {
        organizer: meetup.User.name,
        meetup: meetup.title,
        user: user.name,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', as' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new NotificationMail();
