import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({params}) {
    let id = params.id;

    let connection = await createConnection();
    let [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [id]);
    const [comms] = await connection.execute('SELECT * FROM comments WHERE article_id = ?', [id]);

    return {
        articles: rows,
        comments: comms
    };
}

export const actions = {

    vote: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();

		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'Error upvoting' };
		}
	},

    comm: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const name = formData.get('name');
		const comm = formData.get('comm');

		const connection = await createConnection();

		const [result] = await connection.execute(
			'INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)',
			[id, name, comm]
		);

		return {
			status: 303,
			location: `/articles/${id}`
		};
	}
};