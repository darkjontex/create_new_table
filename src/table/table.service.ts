import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule'; // Import the Cron decorator
import { Connection , Repository, getManager } from 'typeorm';
import { Table1Entity } from '../entities/table1.entity'; // Replace with the actual path
import { async } from 'rxjs';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  teste: string;

  constructor(
    @InjectRepository(Table1Entity)
    private readonly table1Repository: Repository<Table1Entity>,
    private readonly connection: Connection
  ) {}

  @Cron('*/30 * * * * *') // Run the method every 30 seconds
  async checkAndCreateTable(): Promise<void> {
    this.logger.log('Running checkAndCreateTable...');
    try {
      // Add logic to check if a new table is required based on the records in table1
      const recordsCount = await this.table1Repository.count();

      console.log('antes do IF: ', recordsCount);

      if (recordsCount >= 0) {
        const teste = await this.table1Repository
          .createQueryBuilder('d')
          .where('d.id IS NOT NULL')
          .getMany();

        //let teste2 = JSON.parse(this.teste);

        // while (teste.length > 0) {
        //   console.log('teste: ', teste);

        //   //console.log('teste propriedade: ', teste[0].stringColumn1);
          
        //   console.log('Lenght: ', teste.length);
        //   teste.length = teste.length - 1;
        // }

        // Create a new table here using TypeORM's schema-building capabilities
        // Replace 'NewTableEntity' with your desired new table entity
        // Make sure to also create the appropriate entity file and corresponding database table.
        teste.map((item) => {
          this.createCustomTable(item.stringColumn1.toString());
        });
      }
    } catch (error) {
      console.error('Error checking and creating table:', error);
    }
  }

  async createCustomTable(tableName: string): Promise<void> {
    try {
      const checkTableQuery = `SELECT COUNT(*) AS tableExists FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`;
      const [{ tableExists }] = await this.connection.query(checkTableQuery);
  
      if (tableExists === 0) {
        const createTableQuery = `
          CREATE TABLE ${tableName} (
            id INT PRIMARY KEY IDENTITY(1,1),
            date DATETIME,
            stringColumn1 NVARCHAR(100),
            stringColumn2 NVARCHAR(100),
            stringColumn3 NVARCHAR(100)
          )
        `;
  
        await this.connection.query(createTableQuery);
        this.logger.log('New table created successfully.');
      }
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }
}
