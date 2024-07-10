import { DataTypes, Model, Sequelize } from 'sequelize';

class Plugin extends Model {
  public id!: number;
  public name!: string;
  public isActive!: boolean;

  static initModel(sequelize: Sequelize): typeof Plugin {
    Plugin.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize,
      modelName: 'Plugin',
    });

    return Plugin;
  }
}

export default Plugin;
