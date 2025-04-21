import * as mysql from 'mysql2/promise';

export async function waitForMySQL(attempts = 10, delay = 5000) {
  for (let i = 0; i < attempts; i++) {
    try {
      const connection = await mysql.createConnection({
        // host: 'localhost', // Use 'mysql' for Docker container, 'localhost' for local development
        // host: 'mysql', // Use 'mysql' for Docker container, 'localhost' for local development
        host : process.env.DB_HOST,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Vinay@123',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
      });
      await connection.query('SELECT 1');
      await connection.end();
      return true;
    } catch (err) {
      if (i === attempts - 1) throw err;
      console.log(`MySQL not ready, retrying in ${delay/1000} seconds... (attempt ${i+1}/${attempts})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}