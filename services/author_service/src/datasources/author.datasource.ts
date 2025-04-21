import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'author',
  connector: 'mysql',
  host: process.env.DB_HOST, // Use 'mysql' for Docker container, 'localhost' for local development
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Vinay@123',
  database: 'author',

  connectTimeout: 60000, // Only this timeout is needed
  acquireTimeout: 60000, // For connection pool
  connectionLimit: 10,   // Connection pool size
  // Add these for better handling
  debug: false,
  waitForConnections: true,
  queueLimit: 0
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AuthorDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'author';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.author', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
