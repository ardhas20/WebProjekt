import { createConnection } from '$lib/db/mysql.js';
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

// Basic authentication check
async function authenticate(request) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
        return new Response(null, {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return null; // Auth successful
}

// GET all articles
export async function GET({ params }) {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM articles');

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: { 'content-type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Database connection failed' }), {
            status: 500,
            headers: { 'content-type': 'application/json' }
        });
    }
}

// POST create new article
export async function POST({ request }) {
    const auth = await authenticate(request);
    if (auth) return auth;

    const connection = await createConnection();
    const data = await request.json();

    await connection.execute(
        'INSERT INTO articles (image, description, author, votes) VALUES (?, ?, ?, ?)',
        [data.image, data.description, data.author, data.votes]
    );

    await connection.end();

    return new Response(JSON.stringify(data), {
        status: 201,
        headers: { 'content-type': 'application/json' }
    });
}