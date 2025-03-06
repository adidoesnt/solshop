import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_URL } from '../../constants';
import Logger from '../../utils/logger';
import * as schema from './schema';

const logger = new Logger('database');
const database = drizzle(DB_URL, { schema });

export const testConnection = async () => {
  try {
    await database.execute('select 1');
    logger.info('Database connection successful');
  } catch (error) {
    logger.error('Database connection failed:', error);
  }
}

export default database;