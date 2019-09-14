import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.meetup, { foreingKey: 'meetup_id' });
    this.belongsTo(models.user, { foreingKey: 'user_id' });
  }
}

export default Subscription;
