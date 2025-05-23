import { createConnection } from '$lib/db/mysql.js';
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

// Basic auth check
async function authenticate(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader){
        return new Response(null, {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD){
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return null; // Auth successful
}

// GET article by ID
export async function GET({ params }) {
    const { id } = params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM articles WHERE id = ?', [id]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: { 'content-type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(rows[0]), {
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

// PUT update article
export async function PUT({ params, request }) {
    const auth = await authenticate(request);
    if (auth) return auth;

    const connection = await createConnection();
    const { id } = params;
    const data = await request.json();

    await connection.execute(
        'UPDATE articles SET image = ?, description = ?, author = ?, votes = ? WHERE id = ?',
        [data.image, data.description, data.author, data.votes, id]
    );

    await connection.end();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// DELETE article by ID
export async function DELETE({ params, request }) {
    const auth = await authenticate(request);
    if (auth) return auth;

    const { id } = params;

    try {
        const connection = await createConnection();
        const [result] = await connection.execute(
            'DELETE FROM articles WHERE id = ?', [id]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: { 'content-type': 'application/json' }
            });
        }

        return new Response(null, { status: 204 }); // Deleted
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Database connection failed' }), {
            status: 500,
            headers: { 'content-type': 'application/json' }
        });
    }
}