import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {AppService} from "../../app.service";
import {friendRequest} from "./users.interfaces";
import {map} from "rxjs/operators";

@WebSocketGateway({namespace: '/'})
export class UsersGateway {

    @WebSocketServer()
    server: Server;

    private logger = new Logger('UsersGateway');

    constructor(private appService: AppService) {}

    @SubscribeMessage('friendRequest')
    onFriendRequest(socket: Socket, request: friendRequest) {

        let client = this.appService.getClient(request.to)

        if(!client){
            return;
        }

        for (let socketId of client.socketIds){
            this.server.to(`${socketId}`).emit('friendRequest', request.from);
        }
    }


}
