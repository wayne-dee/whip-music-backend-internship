// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const logger = require('../logger')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    logger.error(context.error.message)
    return context;
  };
};
