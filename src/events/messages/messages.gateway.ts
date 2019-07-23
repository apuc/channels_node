import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {map} from 'rxjs/operators';
import { UserMessageRequest, UserMessageResponse, UserTyping } from './messages.interfaces';
import { MessagesService } from './messages.service';

@WebSocketGateway()
export class MessagesGateway {
    @WebSocketServer()
    private server: Server;

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
}
