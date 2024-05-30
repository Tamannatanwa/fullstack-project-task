
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'public.users';
  }
}

module.exports = User;
