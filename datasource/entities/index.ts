import User from "./User";
import Sector from './Sector'
import Field from './Field';
import connection from "../data-source";


for(const modelName in connection.models) {
    const model = connection.models[modelName] as any;
    model.associate(connection.models);
}

export { User, Sector, Field };