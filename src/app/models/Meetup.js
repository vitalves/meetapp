import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        // id user_is file_id title description location date
      },
      {
        sequelize,
      }
    );
  }
}

export default Meetup;
