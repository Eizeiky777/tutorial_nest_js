import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    autoLoadEntities: true,
    synchronize: true,
  } as TypeOrmModuleOptions,
  {
    name: 'default-postgres-2',
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: ['dist/**/v2/*.entity.js'],
    migrations: ['dist/migrations/v2/*.js'],
    cli: {
      migrationsDir: 'src/migrations2',
    },
    autoLoadEntities: true,
    synchronize: true,
  } as TypeOrmModuleOptions,
];

// import parseBoolean from '@eturino/ts-parse-boolean';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
// import { join } from 'path';

// dotenv.config();

// export = [
//   {
//     //name: 'default',
//     type: 'mssql',
//     host: process.env.DEFAULT_DB_HOST,
//     username: process.env.DEFAULT_DB_USERNAME,
//     password: process.env.DEFAULT_DB_PASSWORD,
//     database: process.env.DEFAULT_DB_NAME,
//     options: {
//       instanceName: process.env.DEFAULT_DB_INSTANCE,
//       enableArithAbort: false,
//     },
//     logging: parseBoolean(process.env.DEFAULT_DB_LOGGING),
//     dropSchema: false,
//     synchronize: false,
//     migrationsRun: parseBoolean(process.env.DEFAULT_DB_RUN_MIGRATIONS),
//     migrations: [join(__dirname, '..', 'model/migration/*.{ts,js}')],
//     cli: {
//       migrationsDir: 'src/model/migration',
//     },
//     entities: [
//       join(__dirname, '..', 'model/entity/default/**/*.entity.{ts,js}'),
//     ],
//   } as TypeOrmModuleOptions,
//   {
//     name: 'other',
//     type: 'mssql',
//     host: process.env.OTHER_DB_HOST,
//     username: process.env.OTHER_DB_USERNAME,
//     password: process.env.OTHER_DB_PASSWORD,
//     database: process.env.OTHER_DB_NAME,
//     options: {
//       instanceName: process.env.OTHER_DB_INSTANCE,
//       enableArithAbort: false,
//     },
//     logging: parseBoolean(process.env.OTHER_DB_LOGGING),
//     dropSchema: false,
//     synchronize: false,
//     migrationsRun: false,
//     entities: [],
//   } as TypeOrmModuleOptions,
// ];
