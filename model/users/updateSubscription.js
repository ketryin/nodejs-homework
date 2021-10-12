const usersCollection = require('./usersCollection')

async function updateSubscription(userId, subscription) {
  await usersCollection.findByIdAndUpdate(userId, { subscription })
}

module.exports = updateSubscription
