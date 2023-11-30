import { Model, DataTypes } from "sequelize";
import connection from "../data-source";

const initUser = (sequelize: any, Types: any) => {
    class User extends Model {
        static associate(models: any) {}
    }
    User.init(
        {
            name: Types.STRING,
            sectors: Types.STRING,
            agreed_date: Types.DATE,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
        }
    );
    return User;
};

export default initUser(connection, DataTypes);