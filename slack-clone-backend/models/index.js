import Sequelize from 'sequelize'

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  // Added operatorsAliases in order to prevent the symbolize error from showing up.
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    underscord: true
  }
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team')
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
