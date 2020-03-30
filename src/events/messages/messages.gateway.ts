import {
    SubscribeMessage,
    WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {map} from 'rxjs/operators';
import { UserMessageRequest, UserMessageResponse, UserTyping } from './messages.interfaces';
import { MessagesService } from './messages.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: '/'})
export class MessagesGateway {
    @WebSocketServer()
    server: Server;
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
    onUserTyping(socket: Socket, data: UserTyping) {
       socket.broadcast.to(`${data.channelId}`).emit('typing', data);
    }

    @SubscribeMessage('messageNotification')
    onMessageNotification(socket: Socket, {channel_id,from,notification_data}) {
        socket.broadcast.to(`${channel_id}`).emit('messageNotification', {channel_id,from});

        this.eventService.sendPushNotifications(channel_id,from,notification_data);
    }
}
