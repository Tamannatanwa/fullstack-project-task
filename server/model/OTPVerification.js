const { Model } = require('objection');

class OTPVerification extends Model {
  static get tableName() {
    return 'public.user_otp_verification';
  }

  static get idColumn() {
    return 'id'; // Specify the primary key column name
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'otp', 'expires_at'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        otp: { type: 'string' },
        expires_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

module.exports = OTPVerification;
