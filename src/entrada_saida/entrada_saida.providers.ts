import { DataSource } from 'typeorm';
import { ENTRADA_SAIDA } from './entrada_saida.entity';

export const Entrada_saidaProviders = [
  {
    provide: 'ENTRADA_SAIDA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ENTRADA_SAIDA),
    inject: ['DATA_SOURCE'],
  },
];