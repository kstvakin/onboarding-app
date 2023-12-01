import {Model, DataTypes} from "sequelize";
import connection from "../data-source";

export type SectorAttributes = {
    name: string,
    id: number
};

const initSector = (sequelize: any) => {
    class Sector extends Model<SectorAttributes> {
        static associate(models: any) {
            this.hasMany(models.Field, { as: 'sector', foreignKey: 'sector_id' });
        }
    }

    Sector.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: 'Sector',
            tableName: 'Sectors',
            timestamps: false
        }
    );

    return Sector;
};

export default initSector(connection);