import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
  public id!: number;
  public userId!: string;
  public password!: string;

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'User',
    });

    return User;
  }
}

export default User;
