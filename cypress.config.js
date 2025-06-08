const { defineConfig } = require("cypress");
const mysql = require('mysql2/promise');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                async queryDb(query) {
                    const connection = await mysql.createConnection({
                        host: '127.0.0.1',     // or your DB host
                        user: 'root',          // your DB user
                        password: 'password',  // your DB password
                        database: 'bank'       // your DB name
                    });

                    const [rows] = await connection.execute(query);
                    return rows;
                }
            });
        }
    }
});
