import Meetup from '../models/Meetup';

class MeetupControler {
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetup = await Meetup;
  }
}

export default new Meetup();
