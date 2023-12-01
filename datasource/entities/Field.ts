import {Model, DataTypes} from "sequelize";
import connection from "../data-source";

export type FieldAttributes = {
    name: string,
    sector_id: number,
    id: number
};

const initField = (sequelize: any) => {
    class Field extends Model<FieldAttributes> {
        declare name: string;
        declare sector_id: number;
        declare id: number;
        static associate(models: any) {
            this.belongsTo(models.Sector, {
                foreignKey: 'sector_id'
            });
        }
    }
    Field.init(
        {
            name: {
                type: DataTypes.STRING
            },
            sector_id: {
                type: DataTypes.INTEGER
            },
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        },
        {
            sequelize,
            modelName: 'Field',
            tableName: 'Fields',
            timestamps: false
        }
    );

    return Field;
};

export default initField(connection);