module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', env.DATABASE_HOST),
        port: env.int('DATABASE_PORT', env.DATABASE_PORT),
        database: env('DATABASE_NAME', env.DATABASE_NAME),
        username: env('DATABASE_USERNAME', env.DATABASE_USERNAME),
        password: env('DATABASE_PASSWORD', env.DATABASE_PASSWORD),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
