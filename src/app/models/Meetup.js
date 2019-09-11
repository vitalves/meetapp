import Sequelize, { Model } from 'sequelize';

class Meetapp extends Model {
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

export default Meetapp;
