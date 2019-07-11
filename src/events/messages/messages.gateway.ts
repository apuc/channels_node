import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from '../events.service';
import {map} from 'rxjs/operators';

export interface User {
    username: string;
    avatar: string | null;
    id: number;
}
export interface UserMessageRequest {
    user: User;
    channel_id: number;
    from: number;
    user_id: number;
    text: string;
}
export interface UserMessageResponse {
    id: number;
    channel: number;
    to: number | null;
    from: User;
    attachments: string[];
    read: number;
    created_at: string;
    text: string;
}

export interface UserTyping {
    user: {
        name: string,
        id: number,
    };
    channelId: number;
    isTyping: boolean;
}

@WebSocketGateway()
export class MessagesGateway {
    @WebSocketServer()
    private server: Server;

    constructor(private eventService: EventsService) {}

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
