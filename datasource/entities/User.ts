import {Model, DataTypes, InferAttributes, InferCreationAttributes} from "sequelize";
import connection from "../data-source";

export type UserAttributes = {
    id: number,
    name: string,
    sectors: string,
    agreed_date: Date
};


const initUser = (sequelize: any) => {
    class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        declare id: number;
        declare name: string;
        declare sectors: string;
        declare agreed_date: Date;
        static associate(models: any) {}
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            sectors: DataTypes.STRING,
            agreed_date: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
        }
    );
    return User;
};

export default initUser(connection);