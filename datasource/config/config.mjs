import mysql2 from 'mysql2';

const Configuration =  {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: 3306,
        dialect: 'mysql',
        dialectModule: mysql2,
        logging:false
};

export default Configuration;