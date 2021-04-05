import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './models/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  getMessagesForUser(userId: number) {
    return this.messagesRepository.createQueryBuilder('message')
      .where({ receiverId: userId })
      .select(['message.message', 'message.createdAt', 'users.id', 'users.name'])
      .leftJoin('message.sender', 'users')
      .getMany();
    /*return this.messagesRepository.find({
        where: {
          receiverId: userId,
        },
        relations: ['sender']
      })*/
  }

  async addNewMessage(message: Message) {
    await this.messagesRepository.insert(message)
  }
}
