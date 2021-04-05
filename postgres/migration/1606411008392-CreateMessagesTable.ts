import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMessagesTable1606411008392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "message",
        columns: [
          {
            name: "sender_id",
            type: "int",
          },
          {
            name: "receiver_id",
            type: "int",
          },
          {
            name: 'message',
            type: 'text'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
        ]
      }), true)

      await queryRunner.createForeignKey("message", new TableForeignKey({
        columnNames: ["sender_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      }));

      await queryRunner.createForeignKey("message", new TableForeignKey({
        columnNames: ["receiver_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("message");
    }

}
