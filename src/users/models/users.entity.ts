import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/*
     Column     |            Type             | Collation | Nullable | Default
----------------+-----------------------------+-----------+----------+---------
 id             | integer                     |           | not null |
 email          | character varying           |           | not null |
 name           | character varying           |           | not null |
 rating_count   | integer                     |           | not null |
 rating_average | double precision            |           | not null |
 image          | character varying           |           | not null |
 created_at     | timestamp without time zone |           | not null | now()
*/

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'created_at', default: Date.now() })
  createdAt?: Date;
}
