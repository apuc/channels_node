import {
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {Logger} from '@nestjs/common';
import {AppService} from "../app.service";

@WebSocketGateway({namespace: '/'})
export class EventsGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;
    private logger = new Logger('EventsGateway');

    constructor(private appService: AppService){}

    afterInit(server: Server): void {
        this.logger.log('Socket server init successfully');
    }

    @SubscribeMessage('connection')
    handleConnection({handshake, id}: Socket) {
        this.appService.addClient(handshake.query.user_id,id);
        this.logger.log(`User connected! User id is ${handshake.query.user_id}`);
    }

    @SubscribeMessage('disconnect')
    handleDisconnect({handshake, id}: Socket) {
        this.appService.removeClient(handshake.query.user_id,id)
        this.logger.log(`User disconnected! User id is ${handshake.query.user_id}`);
    }

}
