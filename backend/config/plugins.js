module.exports = ({ env }) => ({
    email: {
        provider: 'smtp',
        providerOptions: {
            host: 'smtp.yandex.ru', //SMTP Host
            port: 465   , //SMTP Port
            secure: true,
            username: 'fortistock@yandex.ru',
            password: '1xU5MMv!',
            //rejectUnauthorized: true,
            requireTLS: true,
            connectionTimeout: 1,
        },
        // settings: {
        //     from: 'all@myforti.ru',
        //     replyTo: 'fortistock@yandex.ru',
        // },
    },
});