const { authenticate } = require('@feathersjs/authentication').hooks;
const logError = require('../../hooks/log-error')

const includeForeignKeys = () => {
  return async context => {
    const { app, params } = context
    const { users } = app.get('sequelizeClient').models
    params.sequelize = {
      include : [
        {
          model: users,
          as: 'user'
        }
      ],
      raw : false
    }
    return context
  }
}

const updateUserPremiumStatus = () => {
  return async context => {
    const { app, result, params } = context 
    
    await app.service('users').patch(result.user_id, {
      is_premium : result.is_premium
    }, params)
    return context
  }
}

const paymentStatus = () => {
  return async context => {
    let { data } = context

    if (data.amount >= 20) {
      data.is_premium = true
    }
    else {
      data.is_premium = false
    }
    context.data = data
    return context
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ includeForeignKeys() ],
    get: [ includeForeignKeys() ],
    create: [ paymentStatus() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ updateUserPremiumStatus() ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logError() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
