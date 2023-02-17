import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true
})