import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableService } from './table/table.service';
import { Table1Entity } from './entities/table1.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql', // Use 'mssql' for MSSQL database
      host: 'localhost', // Change this to your database host
      port: 58554, // Change this to your database port (default is usually 1433)
      username: 'sa', // Change this to your database username
      password: 'P@ssw0rd', // Change this to your database password
      database: 'create_table', // Change this to your database name
      synchronize: true, // Set to false in production
      autoLoadEntities: true,
      options: { trustServerCertificate: true },
    }),
    TypeOrmModule.forFeature([Table1Entity]), // Include the Table1Entity in forFeature
    ScheduleModule.forRoot(),
  ],
  providers: [TableService],
})
export class AppModule {}
