const { defineConfig } = require("cypress");
const mysql = require('mysql2/promise');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                async queryDb(query) {
                    const connection = await mysql.createConnection({
                        host: '',   //db host
                        user: 'root',         
                        password: '',  //your db password
                        database: ''   //your db name   
                    });

                    const [rows] = await connection.execute(query);
                    return rows;
                }
            });
        }
    }
});
