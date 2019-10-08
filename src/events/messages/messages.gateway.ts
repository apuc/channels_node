import {
    SubscribeMessage,
    WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {map} from 'rxjs/operators';
import { UserMessageRequest, UserMessageResponse, UserTyping } from './messages.interfaces';
import { MessagesService } from './messages.service';
import { ServerWithUsers } from '../events.gateway';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: '/'})
export class MessagesGateway {
    @WebSocketServer()
    server: ServerWithUsers;
    private logger = new Logger('MessagesGateway');

    constructor(private eventService: MessagesService) {}

    @SubscribeMessage('userMessage')
    onUserMessage(socket: Socket, messageData: UserMessageRequest) {
        const {channel_id} = messageData;
        this.eventService.saveMessageToDB(messageData)
            .pipe(map((res) => res.data.data))
            .subscribe((res: UserMessageResponse) => {
                this.server.to(`${channel_id}`).emit('userMessage', res);
            });
    }

    @SubscribeMessage('typing')
    onUserTyping(socket: Socket, {channelId, ...other}: UserTyping) {
        socket.broadcast.to(`${channelId}`).emit('typing', other);
    }

    @SubscribeMessage('messageNotification')
    onMessageNotification(socket: Socket, channelId: number) {
        socket.broadcast.to(`${channelId}`).emit('messageNotification', channelId);
    }
}
