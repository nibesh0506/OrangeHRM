const mysql = require('mysql2/promise');

/**
 * @type {import('cypress').Cypress.Config}
 */
const config = {
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                queryDb({ query, values }) {
                    const dbConfig = {
                        host: '127.0.0.1',
                        user: 'root',
                        password: 'password',
                        database: 'bank',
                    };

                    return mysql
                        .createConnection(dbConfig)
                        .then((connection) =>
                            connection.execute(query, values || []).then(([rows]) => {
                                connection.end();
                                return rows;
                            })
                        );
                },
            });

            return config;
        },
    },
};

module.exports = config;
