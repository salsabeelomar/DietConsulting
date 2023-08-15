import config from '../config/index.config';
console.log('+++++++++++++++++++++++++++++');
let databaseConfig: any;
config.forEach(
  (value) => (databaseConfig = value().database ?? databaseConfig),
);
module.exports = databaseConfig;
