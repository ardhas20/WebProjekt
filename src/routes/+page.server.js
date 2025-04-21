import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load() {
    // Create a database connection
    let connection = await createConnection();

    // Show articles ordered by votes in descending order
    let [rows] = await connection.execute('SELECT * FROM articles ORDER BY votes DESC');

    return {
        articles: rows // Return articles data to the component
    };
}