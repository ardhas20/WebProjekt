import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load all articles for admin
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
	// Delete an article by ID
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		try {
			const [result] = await connection.execute(
				'DELETE FROM articles WHERE id = ?', 
				[id]
			);
		} catch (e) {
			console.error(e); // Log error
			return {
				success: false,
				message: "Deletion not possible!" // Error message
			};
		}
	}
};