const mysql = require('mysql2/promise');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

/**
 * @type {import('cypress').Cypress.Config}
 */
const config = {
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                downloadFile,
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
    projectId: "i9v1ej",
};

module.exports = config;
