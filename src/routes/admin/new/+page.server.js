import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
 
export async function load({locals}) {
    if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}


    let connection = await createConnection();
    let [rows] = await connection.execute('SELECT * FROM articles');

    return {
        articles: rows
    };
}
 
export const actions = {
    createArticle: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file');
        const { url } = await put('ProjectImages/' + file.name, file, {
            addRandomSuffix: true,
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});
 
        const connection = await createConnection();
        const [result] = await connection.execute(
            'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
            [
                url,
                formData.get('description'),
                formData.get('author')
            ]
        );
        if (result.affectedRows) {
            redirect(303, '/admin');
        }
    }
};
 