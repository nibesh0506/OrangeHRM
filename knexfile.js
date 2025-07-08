module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'password',
            database: 'bank'
        },
        migrations: {
            directory: './migrations'
        }
    }
};
