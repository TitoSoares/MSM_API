import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '50.116.112.16',
        port: 3306,
        username: 'vitali04_projetomsm',
        password: 'projetomsm',
        database: 'vitali04_projetomsm',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });
      
      return dataSource.initialize();
    },
  },
];