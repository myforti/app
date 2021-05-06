module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://adm.myforti.ru'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', env.ADMIN_JWT_SECRET),
    },
  },
});
