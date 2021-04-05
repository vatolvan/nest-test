import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/*
{
  image: 'https://via.placeholder.com/420',
  name: 'Mulkku',
  ratingAverage: 4.9,
  ratingCount: 102
}
*/

export class CreateUserTable1604141048533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    queryRunner.query(
      'ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
