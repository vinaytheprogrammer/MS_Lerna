import {AuthorServiceApplication} from './application';
import {waitForMySQL} from './utils/db-utils'; // Create this utility

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  // Wait for MySQL to be ready
  await waitForMySQL();

  const app = new AuthorServiceApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});
  
  // Exit explicitly to avoid hanging
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});