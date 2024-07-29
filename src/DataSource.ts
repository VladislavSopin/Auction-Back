import { ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { config } from 'dotenv'

config()

export const getTypeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  const result: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('PG_HOST'),
    port: configService.get<number>('PG_PORT'),
    username: configService.get<string>('PG_USER'),
    password: configService.get<string>('PG_PASSWORD'),
    database: configService.get<string>('PG_DB'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
  }

  return result
}

export default new DataSource(getTypeOrmConfig(new ConfigService()))
