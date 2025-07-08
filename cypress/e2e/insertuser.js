const knex = require("knex")({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'bank'
    }
})

knex('users')
    .where('id', 1)
    .update(({
        "name": "ram",
        "email": "ram@gmail.com"
    }))
    .then(() => {
        console.log('user updated successfully') //success message to be shown in terminal
    })
    .catch(err => {
        console.log('Error in updating a user', err) //error message to be shown in terminal
    })
    .finally(() => {
        return knex.destroy(); //closing the established connection
    })