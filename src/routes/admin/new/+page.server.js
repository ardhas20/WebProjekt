import { createConnection } from '$lib/db/mysql';
import { redirect, error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Load articles for admin dashboard
export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login'); // Redirect if not admin
	}

	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');

	return {
		articles: rows // Return articles
	};
}

export const actions = {
	// Create a new article
	createArticle: async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('file');

		// Upload image to Vercel Blob
		const { url } = await put('ProjectImages/' + file.name, file, {
			addRandomSuffix: true,
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN
		});

		// Save article in database
		const connection = await createConnection();
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[url, formData.get('description'), formData.get('author')]
		);

		// Redirect if success
		if (result.affectedRows) {
			redirect(303, '/admin');
		}
	}
};