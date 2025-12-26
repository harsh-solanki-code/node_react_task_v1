const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    firstName: {
      type: 'varchar',
    },
    lastName: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    passwordHash: {
      type: 'varchar',
    },
    isEmailVerified: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
});
