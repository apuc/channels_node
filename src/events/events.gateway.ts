import {
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

export interface ServerWithUsers extends Server {
    connectedUsers?: {
        [key: string ]: string[],
    };
}

@WebSocketGateway({namespace: '/'})
export class EventsGateway implements OnGatewayInit {
    @WebSocketServer()
    server: ServerWithUsers;
    private logger = new Logger('EventsGateway');

    afterInit(server: Server): void {
        this.logger.log('Socket server init successfully');
        this.server.connectedUsers = {};
    }

    @SubscribeMessage('connection')
    handleConnection({handshake, id}: Socket) {
        if (!this.server.connectedUsers[handshake.query.user_id]) {
            this.server.connectedUsers[handshake.query.user_id] = [id];
        } else {
            this.server.connectedUsers[handshake.query.user_id].push(id);
        }
        this.logger.log(`User connected! User id is ${handshake.query.user_id}`);
    }

    @SubscribeMessage('disconnect')
    handleDisconnect({handshake, id}: Socket) {
        const currentUser = this.server.connectedUsers[handshake.query.user_id];
        this.server.connectedUsers[handshake.query.user_id] = currentUser.filter((userId => userId !== id));
        this.logger.log(`User disconnected! User id is ${handshake.query.user_id}`);
    }

}
