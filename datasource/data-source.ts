import {Sequelize} from 'sequelize';
import config from './config/config.mjs';


const connection = new Sequelize(config as any);

export default connection;