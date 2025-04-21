import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
    // Handle user login
    login: async ({ request, cookies }) => {

        const formData = await request.formData(); // Extract form data
        const email = formData.get('email'); // Get email
        const password = formData.get('password'); // Get password

        // Authenticate and get session token
        const token = await login(email, password);

        if (token) {
            // Set session cookie if login successful
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7, // Cookie valid for 7 days
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });
            redirect(302, '/admin'); // Redirect to admin page
        } else {
            return {
                success: false,
                message: 'Login failed' // Return error message if login fails
            };
        }
    }
};