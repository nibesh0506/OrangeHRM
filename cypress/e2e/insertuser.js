const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig.development);

async function runQueries() {
    try {
        const users = await knex('users').select('*');
        console.log("Users fetched successfully", users);

        const name = "ram".trim();
        const email = "ram787@gmail.com".trim().toLowerCase()
        if (!name || !email.includes("@")) {
            throw new Error("Invalid input data");
        }

        const existing = await knex('users').where('email', email).first();
        if (existing) {
            throw new Error('Email already registered');
        }

        const insertedIds = await knex('users').insert({name, email});
        console.log("User inserted successfully with ID:", insertedIds);

        const userId = insertedIds[0];

        const user = await knex('users').where('id', userId).first();
        if (!user) {
            throw new Error("User not found for update");
        }

        const updatedCount = await knex('users')
            .where('id', userId)
            .update({
                name: "ram12", email: "ram@gmail.com"
            });
        console.log(`User updated successfully, rows affected: ${updatedCount}`);

        const deletedCount = await knex('users')
            .where('id', userId)
            .delete();
        console.log(`User deleted successfully, rows affected: ${deletedCount}`);

    } catch (err) {
        console.error("Error during DB operations:", err);
    } finally {
        await knex.destroy();
    }
}

return runQueries();