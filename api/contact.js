import { createPool } from '@vercel/postgres';

const pool = createPool({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
    // CORS Headers for Vercel
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        // Try to insert the message
        await pool.sql`
      INSERT INTO messages (name, email, subject, message, created_at)
      VALUES (${name}, ${email}, ${subject}, ${message}, NOW());
    `;

        return res.status(200).json({ success: true, message: 'Message saved successfully' });
    } catch (error) {
        // If the table doesn't exist, we can handle it gracefully the first time
        if (error.message && error.message.includes('relation "messages" does not exist')) {
            try {
                await pool.sql`
                CREATE TABLE messages (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    subject VARCHAR(255),
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            `;
                // Retry the insert after creating the table
                const { name, email, subject, message } = req.body;
                await pool.sql`
                INSERT INTO messages (name, email, subject, message, created_at)
                VALUES (${name}, ${email}, ${subject}, ${message}, NOW());
            `;
                return res.status(200).json({ success: true, message: 'Message saved successfully (table automatically initialized)' });
            } catch (createError) {
                console.error("Failed to create table:", createError);
                return res.status(500).json({ error: 'Database table creation failed', details: createError.message });
            }
        }

        console.error("Database error occurred:", error);
        return res.status(500).json({ error: 'Internal Database Error', details: error.message });
    }
}
