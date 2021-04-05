import { Controller, Request, Get, UseGuards, Post, Body } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { Message } from './models/message.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface NewMessageDto {
  message: string;
  receiverId: number;
}

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  async getMyMessages(@Request() request: any): Promise<Message[]> {
    const userId = request.user.id;
    return this.messagesService.getMessagesForUser(userId);
  }

  @Post()
  async sendNewMessage(
    @Request() request: any,
    @Body() newMessageDto: NewMessageDto,
  ): Promise<void> {
    const senderId = request.user.id;

    const message: Message = {
      senderId,
      receiverId: newMessageDto.receiverId,
      message: newMessageDto.message,
    };

    return this.messagesService.addNewMessage(message);
  }
}
