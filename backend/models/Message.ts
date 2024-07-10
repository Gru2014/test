import { DataTypes, Model, Sequelize } from 'sequelize';

class Message extends Model {
  public id!: number;
  public content!: string;
  public user!: string;
  public status!: string;
  public timestamp!: Date;

  static initModel(sequelize: Sequelize): typeof Message {
    Message.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('sent', 'received'),
        defaultValue: 'sent',
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
    }, {
      sequelize,
      modelName: 'Message',
    });

    return Message;
  }
}

export default Message;
