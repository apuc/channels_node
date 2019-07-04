import {
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
    @WebSocketServer()
    private server: Server;

    afterInit(server: Server): void {
        console.log('init');
    }

}