import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';

import { Users } from '../../users/models/users.entity';


/*
                           Table "public.message"
   Column    |            Type             | Collation | Nullable | Default
-------------+-----------------------------+-----------+----------+---------
 sender_id   | integer                     |           | not null |
 receiver_id | integer                     |           | not null |
 message     | text                        |           | not null |
 created_at  | timestamp without time zone |           | not null | now()
Foreign-key constraints:
    "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
    "FK_f4da40532b0102d51beb220f16a" FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
*/


@Entity()
export class Message {
  @Column({ name: 'sender_id' })
  senderId: number;

  @PrimaryColumn({ name: 'receiver_id' })
  receiverId: number;

  @PrimaryColumn({ name: 'message' })
  message: string;

  @Column({ name: 'created_at', default: Date.now() })
  createdAt?: Date;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'sender_id' })
  sender?: Users;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'receiver_id' })
  receiver?: Users;
}
