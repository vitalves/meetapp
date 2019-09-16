import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        // meetup_id: sequelize.INTEGER,
        // user_id: sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meetup, { foreingKey: 'meetup_id' });
    this.belongsTo(models.User, { foreingKey: 'user_id' });
  }
}

export default Subscription;
